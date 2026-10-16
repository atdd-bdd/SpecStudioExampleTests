/// IDForm as a table cell holds it: the unconverted text.
///
/// ExpressibleByStringLiteral, so a generated row still writes the cell as a
/// literal while a signature names the DataType the specification declared.
public struct IDFormString: CustomStringConvertible, Equatable, ExpressibleByStringLiteral {
    public let value: String

    public init(_ value: String) {
        self.value = value
    }

    public init(stringLiteral value: String) {
        self.value = value
    }

    public static func fromText(_ text: String) -> IDFormString {
        return IDFormString(text)
    }

    public var description: String {
        return value
    }

    public static let dncString = "?DNC?"

    public static func == (a: IDFormString, b: IDFormString) -> Bool {
        return a.value == dncString || b.value == dncString || a.value == b.value
    }
}
