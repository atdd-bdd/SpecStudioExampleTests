public struct ResultTyped: Equatable, CustomStringConvertible {
    public let addressMatches: [MatchTyped]

    public init(addressMatches: [MatchTyped]) {
        self.addressMatches = addressMatches
    }

    public init(from s: ResultString) {
        self.addressMatches = []
    }

    public func toStringStruct() -> ResultString {
        return ResultString(
            addressMatches: ""
        )
    }

    public static func toStringList(_ list: [ResultTyped]) -> [ResultString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [ResultString]) -> [ResultTyped] {
        return list.map { ResultTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "addressMatches": addressMatches.map { $0.toJSONValue() },
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.addressMatches = try Json.asArray(Json.require(m, "addressMatches"), "addressMatches").map { try MatchTyped(fromJSONValue: Json.asObject($0, "addressMatches")) }
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ResultTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ResultTyped] {
        return try Json.parseArray(text).map {
            try ResultTyped(fromJSONValue: Json.asObject($0, "ResultTyped"))
        }
    }

    public var description: String {
        return "addressMatches=\(addressMatches)"
    }
}
