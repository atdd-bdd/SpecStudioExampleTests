/// IDForm converted: the text, which the glue converts to
/// the production value.
///
/// Swift's initializer for a DataType throws when the type can refuse a
/// value and does not when it cannot, and the generator cannot know which,
/// so there is no call it could write here. That rule is the project's own
/// in any case, and a specification may state a value the rule refuses, so
/// reading it belongs in the glue rather than on a line of a test body --
/// a test body throws nothing.
public struct IDFormTyped: Equatable, CustomStringConvertible {
    public let text: String

    public init(_ text: String) {
        self.text = text
    }

    public init(from s: IDFormString) {
        self.text = s.value
    }

    public static let dncString = "?DNC?"

    /// False for an empty cell and for the Do-Not-Care marker, neither of
    /// which states a value.
    public var hasValue: Bool {
        return !text.isEmpty && text != IDFormTyped.dncString
    }

    /// The text to convert.
    public func get() -> String {
        return text
    }

    public func toIDFormString() -> IDFormString {
        return IDFormString(text)
    }

    public static func toStringList(_ list: [IDFormTyped]) -> [IDFormString] {
        return list.map { $0.toIDFormString() }
    }

    public static func fromStringList(_ list: [IDFormString]) -> [IDFormTyped] {
        return list.map { IDFormTyped(from: $0) }
    }

    public var description: String {
        return text
    }

    public static func == (a: IDFormTyped, b: IDFormTyped) -> Bool {
        return a.text == dncString || b.text == dncString || a.text == b.text
    }
}
