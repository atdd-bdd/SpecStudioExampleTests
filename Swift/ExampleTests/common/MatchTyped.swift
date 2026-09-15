public struct MatchTyped: Equatable, CustomStringConvertible {
    public let matchedAddress: String
    public let addressComponents: AddressComponentsTyped

    public init(matchedAddress: String, addressComponents: AddressComponentsTyped) {
        self.matchedAddress = matchedAddress
        self.addressComponents = addressComponents
    }

    public init(from s: MatchString) {
        self.matchedAddress = s.matchedAddress
        self.addressComponents = AddressComponentsTyped(from: s.addressComponents)
    }

    public func toStringStruct() -> MatchString {
        return MatchString(
            matchedAddress: String(describing: matchedAddress),
            addressComponents: addressComponents.toStringStruct()
        )
    }

    public static func toStringList(_ list: [MatchTyped]) -> [MatchString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [MatchString]) -> [MatchTyped] {
        return list.map { MatchTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "matchedAddress": matchedAddress,
            "addressComponents": addressComponents.toJSONValue(),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.matchedAddress = try Json.asString(Json.require(m, "matchedAddress"), "matchedAddress")
        self.addressComponents = try AddressComponentsTyped(fromJSONValue: Json.asObject(Json.require(m, "addressComponents"), "addressComponents"))
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [MatchTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [MatchTyped] {
        return try Json.parseArray(text).map {
            try MatchTyped(fromJSONValue: Json.asObject($0, "MatchTyped"))
        }
    }

    public var description: String {
        return "matchedAddress=\(matchedAddress), addressComponents=\(addressComponents)"
    }
}
