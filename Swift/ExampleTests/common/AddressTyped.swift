public struct AddressTyped: Equatable, CustomStringConvertible {
    public let street: SimpleTextTyped
    public let city: SimpleTextTyped
    public let state: SimpleTextTyped
    public let zIP: SimpleTextTyped

    public init(street: SimpleTextTyped, city: SimpleTextTyped, state: SimpleTextTyped, zIP: SimpleTextTyped) {
        self.street = street
        self.city = city
        self.state = state
        self.zIP = zIP
    }

    public init(from s: AddressString) {
        self.street = SimpleTextTyped(from: s.street)
        self.city = SimpleTextTyped(from: s.city)
        self.state = SimpleTextTyped(from: s.state)
        self.zIP = SimpleTextTyped(from: s.zIP)
    }

    public func toStringStruct() -> AddressString {
        return AddressString(
            street: street.toSimpleTextString(),
            city: city.toSimpleTextString(),
            state: state.toSimpleTextString(),
            zIP: zIP.toSimpleTextString()
        )
    }

    public static func toStringList(_ list: [AddressTyped]) -> [AddressString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [AddressString]) -> [AddressTyped] {
        return list.map { AddressTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "street": street.text,
            "city": city.text,
            "state": state.text,
            "zIP": zIP.text,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.street = SimpleTextTyped(try Json.asString(Json.require(m, "street"), "street"))
        self.city = SimpleTextTyped(try Json.asString(Json.require(m, "city"), "city"))
        self.state = SimpleTextTyped(try Json.asString(Json.require(m, "state"), "state"))
        self.zIP = SimpleTextTyped(try Json.asString(Json.require(m, "zIP"), "zIP"))
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
