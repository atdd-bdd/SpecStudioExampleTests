import Foundation
import XCTest

/// Exercises a live REST API over HTTP.
///
/// There are no production classes behind this one: the API itself is the thing
/// under test. RestCall does the transport, so what is left here is only the
/// three things glue should do -- turn a table into JSON with the generated
/// toJSON(), turn the response JSON back into a table with the generated
/// init(fromJSONValue:), and compare.
///
/// The status and the body are separate steps because they come from separate
/// places. Keeping them apart is what lets the body go straight through the
/// generated reader: while a status was mixed into the body's attribute set, the
/// reader demanded a "status" field no API response ever contains.
public class APIGlue {
    private static let dncString = "?DNC?"


    private var basePage = ""

    /// Bodies offered by Given steps, keyed by the attribute set that carried them.
    private var bodies: [String: String] = [:]

    private var call: RestCall?

    public init() {}

    // ---- given --------------------------------------------------------------

    public func givenBasePageIs(_ values: [[String]]) {
        for row in values {
            for cell in row where !cell.trimmed.isEmpty {
                basePage = cell.trimmed
            }
        }
        XCTAssertFalse(basePage.isEmpty, "no base Page given")
    }

    public func givenNewPostData(_ values: [NewPostString]) {
        for value in values {
            bodies["NewPost"] = json { try NewPostTyped(from: value).toJSON() }
        }
    }

    public func givenReplacementData(_ values: [ReplacePostString]) {
        for value in values {
            bodies["ReplacePost"] = json { try ReplacePostTyped(from: value).toJSON() }
        }
    }

    public func givenPatchData(_ values: [PatchTitleString]) {
        for value in values {
            bodies["PatchTitle"] = json { try PatchTitleTyped(from: value).toJSON() }
        }
    }

    // ---- when ---------------------------------------------------------------

    public func whenSendingRequest(_ values: [ApiRequestString]) {
        for value in values {
            let request = ApiRequestTyped(from: value)

            // Body names an attribute set a Given step already turned into JSON.
            let bodyName = request.body.trimmed
            var payload = ""
            if !bodyName.isEmpty {
                guard let held = bodies[bodyName] else {
                    XCTFail("no Given step supplied a body named \(bodyName)")
                    return
                }
                payload = held
            }

            do {
                call = try RestCall.send(method: request.method, baseUrl: basePage,
                                         page: request.page, parameter: request.parameter,
                                         request: payload)
            } catch {
                XCTFail("\(error)")
            }
        }
    }

    // ---- then ---------------------------------------------------------------

    public func thenResponseStatusIs(_ values: [ApiStatusString]) {
        guard let call = call else { return XCTFail("no request was sent") }

        for expected in values {
            XCTAssertEqual(ApiStatusTyped(from: expected).code, call.status,
                           "HTTP status from \(call.url)")
        }
    }

    public func thenResponseBodyIs(_ values: [PostString]) {
        guard let call = call else { return XCTFail("no request was sent") }

        do {
            let actual = try PostTyped(fromJSON: call.body)
            for expected in values {
                comparePost("", expected, actual)
            }
        } catch {
            XCTFail("\(error)")
        }
    }

    public func thenResponseArrayContainsThisManyItems(_ values: [[String]]) {
        guard let call = call else { return XCTFail("no request was sent") }

        guard let expected = Int(values[0][0].trimmed) else {
            return XCTFail("not a count: \(values[0][0])")
        }
        do {
            let items = try PostTyped.fromJSONList(call.body)
            XCTAssertEqual(items.count, expected,
                           "number of items returned by \(call.url)")
        } catch {
            XCTFail("\(error)")
        }
    }

    // ---- helpers ------------------------------------------------------------

    private func json(_ build: () throws -> String) -> String {
        do {
            return try build()
        } catch {
            XCTFail("\(error)")
            return ""
        }
    }

    // ---- the one comparison -------------------------------------------------

    /// One expected row against one returned post.
    ///
    /// A table that states every column is compared typed, so that the values
    /// are checked as the types the specification declares and not merely as
    /// matching text. A CompareOnly table cannot be: its unstated columns hold
    /// ?DNC?, which has no typed meaning, and only the String struct knows to
    /// skip it. So that case compares the string form of both sides instead.
    private func comparePost(_ where_: String, _ expected: PostString, _ actual: PostTyped) {
        if APIGlue.statesEveryColumn(expected) {
            XCTAssertEqual(PostTyped(from: expected), actual, "\(where_)post")
        } else {
            XCTAssertEqual(expected, actual.toStringStruct(), "\(where_)post")
        }
    }

    /// False when any column was left to CompareOnly, and so holds ?DNC?.
    private static func statesEveryColumn(_ row: PostString) -> Bool {
        return row.userId != dncString && row.id != dncString
            && row.title != dncString && row.body != dncString
    }
}

private extension String {
    var trimmed: String { return trimmingCharacters(in: .whitespaces) }
}
