public struct AddressTyped {
    public let street: SimpleText
    public let city: SimpleText
    public let state: SimpleText
    public let zIP: SimpleText

    public init(street: SimpleText, city: SimpleText, state: SimpleText, zIP: SimpleText) {
        self.street = street
        self.city = city
        self.state = state
        self.zIP = zIP
    }

    public init(from s: AddressString) {
        self.street = SimpleText(s.street)
        self.city = SimpleText(s.city)
        self.state = SimpleText(s.state)
        self.zIP = SimpleText(s.zIP)
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "street": String(describing: street),
            "city": String(describing: city),
            "state": String(describing: state),
            "zIP": String(describing: zIP),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.street = SimpleText(try Json.asString(Json.require(m, "street"), "street"))
        self.city = SimpleText(try Json.asString(Json.require(m, "city"), "city"))
        self.state = SimpleText(try Json.asString(Json.require(m, "state"), "state"))
        self.zIP = SimpleText(try Json.asString(Json.require(m, "zIP"), "zIP"))
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
}
