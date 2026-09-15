public struct AddressComponentsTyped: Equatable, CustomStringConvertible {
    public let zip: String
    public let streetName: String
    public let city: String
    public let preDirection: String
    public let suffixDirection: String
    public let state: String
    public let suffixType: String

    public init(zip: String, streetName: String, city: String, preDirection: String, suffixDirection: String, state: String, suffixType: String) {
        self.zip = zip
        self.streetName = streetName
        self.city = city
        self.preDirection = preDirection
        self.suffixDirection = suffixDirection
        self.state = state
        self.suffixType = suffixType
    }

    public init(from s: AddressComponentsString) {
        self.zip = s.zip
        self.streetName = s.streetName
        self.city = s.city
        self.preDirection = s.preDirection
        self.suffixDirection = s.suffixDirection
        self.state = s.state
        self.suffixType = s.suffixType
    }

    public func toStringStruct() -> AddressComponentsString {
        return AddressComponentsString(
            zip: String(describing: zip),
            streetName: String(describing: streetName),
            city: String(describing: city),
            preDirection: String(describing: preDirection),
            suffixDirection: String(describing: suffixDirection),
            state: String(describing: state),
            suffixType: String(describing: suffixType)
        )
    }

    public static func toStringList(_ list: [AddressComponentsTyped]) -> [AddressComponentsString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [AddressComponentsString]) -> [AddressComponentsTyped] {
        return list.map { AddressComponentsTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "zip": zip,
            "streetName": streetName,
            "city": city,
            "preDirection": preDirection,
            "suffixDirection": suffixDirection,
            "state": state,
            "suffixType": suffixType,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.zip = try Json.asString(Json.require(m, "zip"), "zip")
        self.streetName = try Json.asString(Json.require(m, "streetName"), "streetName")
        self.city = try Json.asString(Json.require(m, "city"), "city")
        self.preDirection = try Json.asString(Json.require(m, "preDirection"), "preDirection")
        self.suffixDirection = try Json.asString(Json.require(m, "suffixDirection"), "suffixDirection")
        self.state = try Json.asString(Json.require(m, "state"), "state")
        self.suffixType = try Json.asString(Json.require(m, "suffixType"), "suffixType")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [AddressComponentsTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [AddressComponentsTyped] {
        return try Json.parseArray(text).map {
            try AddressComponentsTyped(fromJSONValue: Json.asObject($0, "AddressComponentsTyped"))
        }
    }

    public var description: String {
        return "zip=\(zip), streetName=\(streetName), city=\(city), preDirection=\(preDirection), suffixDirection=\(suffixDirection), state=\(state), suffixType=\(suffixType)"
    }
}
