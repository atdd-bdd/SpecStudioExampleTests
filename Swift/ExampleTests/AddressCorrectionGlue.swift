import XCTest
import Foundation

/// Glue for a specification that tests a live service.
///
/// There are no production classes: the Census Bureau geocoder is the thing
/// under test. So this file does only three things -- build the call, hand the
/// reply to the generated init(fromJSON:), and compare. It never touches the
/// JSON itself.
///
/// That is possible because the attribute sets in the specification mirror the
/// shape of the reply, so ResponseTyped reads all of it. Glue navigating a reply
/// is a sign the specification is not describing it honestly.
public class AddressCorrectionGlue {
    private var baseUrl = ""
    private var response: RestCall?

    public init() {}

    public func givenBasePageIs(_ values: [[String]]) {
        baseUrl = values[0][0]
    }

    public func whenSendingRequest(_ values: [RequestString]) {
        let request = values[0]
        do {
            response = try RestCall.send(method: request.method, baseUrl: baseUrl,
                                         page: request.page, parameter: query(request),
                                         request: "")
        } catch {
            XCTFail("\(error)")
        }
    }

    public func thenResponseStatusIs(_ values: [StatusString]) {
        guard let call = response else { return XCTFail("no request was sent") }
        XCTAssertEqual(StatusTyped(from: values[0]).code, call.status,
                       "HTTP status from \(call.url)")
    }

    public func thenTheMatchedAddressesAre(_ values: [MatchString]) {
        var remaining = matches()
        XCTAssertEqual(values.count, remaining.count,
                       "number of matches\n  expected: \(values)\n  actual:   \(remaining)")

        // Compared as a set rather than in order: each expected row must find an
        // actual row it has not already claimed. A test that fails because a
        // service reordered its results is testing the wrong thing.
        //
        // The comparison is on the String form, not the Typed one. Only the
        // String structs skip a field holding ?DNC?, which is what makes a
        // CompareOnly table check its own columns and no others.
        for expected in values {
            guard let found = remaining.firstIndex(where: { $0 == expected }) else {
                XCTFail("no returned address matched \(expected)\n  remaining: \(remaining)")
                return
            }
            remaining.remove(at: found)
        }
    }

    public func thenThereAreNoMatchedAddresses() {
        XCTAssertEqual(0, matches().count,
                       "expected no match for an address that does not exist")
    }

    // ---- the two translations ---------------------------------------------

    /// The reply, read by the generated reader, as the rows a table compares.
    private func matches() -> [MatchString] {
        guard let call = response else {
            XCTFail("no request was sent")
            return []
        }
        do {
            let reply = try ResponseTyped(fromJSON: call.body)
            return MatchTyped.toStringList(reply.result.addressMatches)
        } catch {
            XCTFail("\(error)")
            return []
        }
    }

    /// The query string the geocoder expects, from the fields of the table.
    private func query(_ request: RequestString) -> String {
        return "?address=" + encode(request.address)
             + "&benchmark=" + encode(request.benchmark)
             + "&format=" + encode(request.format)
    }

    private func encode(_ value: String) -> String {
        var allowed = CharacterSet.alphanumerics
        allowed.insert(charactersIn: "-_.~")
        return value.addingPercentEncoding(withAllowedCharacters: allowed) ?? value
    }
}
