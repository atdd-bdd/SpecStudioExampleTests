import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

/// The transport for a specification that tests a live service.
///
/// It lives beside the glue rather than in common/, which every build rewrites.
/// It knows nothing about addresses: give it the pieces of a call and it returns
/// the status and the body. Deciding what the answer should be is the
/// specification's job, and comparing is the glue's.
///
/// A call that cannot be made at all throws, naming the URL. That is a broken
/// test rather than a failed assertion, and the two should not look alike in the
/// output.
public struct RestCall {
    public let status: Int
    public let body: String
    public let url: String

    public enum RestError: Error, CustomStringConvertible {
        case failed(String)

        public var description: String {
            switch self {
            case .failed(let message): return message
            }
        }
    }

    /// Sends one request and returns the result.
    ///
    /// A parameter beginning with '?' is a query string and is appended as it
    /// stands; anything else is a path segment and is joined with a slash. So
    /// posts/1 is page "posts" with parameter "1", and a search is page
    /// "search" with parameter "?q=hat".
    public static func send(method: String, baseUrl: String, page: String,
                            parameter: String, request: String) throws -> RestCall {
        let url = buildUrl(baseUrl, page, parameter)
        let verb = method.trimmingCharacters(in: .whitespaces).uppercased()

        guard let target = URL(string: url) else {
            throw RestError.failed("\(url) is not a URL")
        }

        var httpRequest = URLRequest(url: target)
        httpRequest.httpMethod = verb
        httpRequest.timeoutInterval = 30
        httpRequest.setValue("application/json", forHTTPHeaderField: "Accept")
        httpRequest.setValue("application/json; charset=UTF-8", forHTTPHeaderField: "Content-Type")
        if !request.trimmingCharacters(in: .whitespaces).isEmpty {
            httpRequest.httpBody = request.data(using: .utf8)
        }

        // URLSession is asynchronous; the specification's steps are not, so the
        // call is awaited here rather than colouring every step with async.
        var result: Result<(Int, String), Error>?
        let waiting = DispatchSemaphore(value: 0)

        URLSession.shared.dataTask(with: httpRequest) { data, response, error in
            defer { waiting.signal() }
            if let error = error {
                result = .failure(RestError.failed("Could not call \(url) -- \(error)"))
                return
            }
            let status = (response as? HTTPURLResponse)?.statusCode ?? 0
            let body = data.flatMap { String(data: $0, encoding: .utf8) } ?? ""
            result = .success((status, body))
        }.resume()

        if waiting.wait(timeout: .now() + 40) == .timedOut {
            throw RestError.failed("Could not call \(url) -- timed out")
        }

        switch result {
        case .success(let (status, body)): return RestCall(status: status, body: body, url: url)
        case .failure(let error):          throw error
        case .none:                        throw RestError.failed("\(url) returned nothing")
        }
    }

    /// Joins the pieces with exactly one slash, dropping any that are empty.
    private static func buildUrl(_ baseUrl: String, _ page: String, _ parameter: String) -> String {
        func trimmed(_ piece: String) -> String {
            var p = piece.trimmingCharacters(in: .whitespaces)
            while p.hasPrefix("/") { p.removeFirst() }
            while p.hasSuffix("/") { p.removeLast() }
            return p
        }

        var url = trimmed(baseUrl)
        let cleanPage = trimmed(page)
        if !cleanPage.isEmpty { url += "/" + cleanPage }

        if !parameter.isEmpty {
            if parameter.hasPrefix("?") { url += parameter }
            else { url += "/" + trimmed(parameter) }
        }
        return url
    }
}
