public struct AddressTyped: Equatable, CustomStringConvertible {
    public let street: String
    public let city: String
    public let state: String
    public let zIP: String

    public init(street: String, city: String, state: String, zIP: String) {
        self.street = street
        self.city = city
        self.state = state
        self.zIP = zIP
    }

    public init(from s: AddressString) {
        self.street = s.street
        self.city = s.city
        self.state = s.state
        self.zIP = s.zIP
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "street": street,
            "city": city,
            "state": state,
            "zIP": zIP,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.street = try Json.asString(Json.require(m, "street"), "street")
        self.city = try Json.asString(Json.require(m, "city"), "city")
        self.state = try Json.asString(Json.require(m, "state"), "state")
        self.zIP = try Json.asString(Json.require(m, "zIP"), "zIP")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [AddressTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [AddressTyped] {
        return try Json.parseArray(text).map {
            try AddressTyped(fromJSONValue: Json.asObject($0, "AddressTyped"))
        }
    }

    public var description: String {
        return "Street=\(street), City=\(city), State=\(state), ZIP=\(zIP)"
    }
}
