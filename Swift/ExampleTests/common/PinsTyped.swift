/// Pins converted: the text, which the glue converts to
/// the production value.
///
/// Swift's initializer for a DataType throws when the type can refuse a
/// value and does not when it cannot, and the generator cannot know which,
/// so there is no call it could write here. That rule is the project's own
/// in any case, and a specification may state a value the rule refuses, so
/// reading it belongs in the glue rather than on a line of a test body --
/// a test body throws nothing.
public struct PinsTyped: Equatable, CustomStringConvertible {
    public let text: String

    public init(_ text: String) {
        self.text = text
    }

    public init(from s: PinsString) {
        self.text = s.value
    }

    public static let dncString = "?DNC?"

    /// False for an empty cell and for the Do-Not-Care marker, neither of
    /// which states a value.
    public var hasValue: Bool {
        return !text.isEmpty && text != PinsTyped.dncString
    }

    /// The text to convert.
    public func get() -> String {
        return text
    }

    public func toPinsString() -> PinsString {
        return PinsString(text)
    }

    public static func toStringList(_ list: [PinsTyped]) -> [PinsString] {
        return list.map { $0.toPinsString() }
    }

    public static func fromStringList(_ list: [PinsString]) -> [PinsTyped] {
        return list.map { PinsTyped(from: $0) }
    }

    public var description: String {
        return text
    }

    public static func == (a: PinsTyped, b: PinsTyped) -> Bool {
        return a.text == dncString || b.text == dncString || a.text == b.text
    }
}
