import Foundation

/// The compact JSON-like text used by the Json specification: names are not
/// quoted, values are, and whitespace between tokens is insignificant.
///
///     {anInt:"1",aString:"B"}
///     [{anInt:"1",aString:"B"},{anInt:"2",aString:"C"}]
///
/// Field order is preserved, so a canonical form can be compared directly.
public enum SimpleJson {

    /// One name/value pair. An array of these keeps the declared order, which a
    /// dictionary would not.
    public typealias Field = (name: String, value: String)

    public struct ParseError: Error, CustomStringConvertible {
        public let message: String
        public init(_ message: String) { self.message = message }
        public var description: String { return message }
    }

    // -------------------------------------------------------------------------
    // Writing
    // -------------------------------------------------------------------------

    public static func toObject(_ fields: [Field]) -> String {
        let parts = fields.map { "\($0.name):\(quoted($0.value))" }
        return "{" + parts.joined(separator: ",") + "}"
    }

    public static func toArray(_ rows: [[Field]]) -> String {
        return "[" + rows.map { toObject($0) }.joined(separator: ",") + "]"
    }

    private static func quoted(_ value: String) -> String {
        var out = "\""
        for c in value {
            if c == "\"" || c == "\\" { out.append("\\") }
            out.append(c)
        }
        out.append("\"")
        return out
    }

    // -------------------------------------------------------------------------
    // Reading
    // -------------------------------------------------------------------------

    public static func parseObject(_ text: String) throws -> [Field] {
        var c = Cursor(text)
        let fields = try readObject(&c)
        c.skipWhitespace()
        guard c.atEnd else { throw ParseError("Unexpected text after object at \(c.pos)") }
        return fields
    }

    public static func parseArray(_ text: String) throws -> [[Field]] {
        var c = Cursor(text)
        c.skipWhitespace()
        try c.expect("[")
        var rows: [[Field]] = []
        c.skipWhitespace()
        if c.peek == "]" {
            _ = c.next()
        } else {
            while true {
                rows.append(try readObject(&c))
                c.skipWhitespace()
                let d = c.next()
                if d == "," { continue }
                if d == "]" { break }
                throw ParseError("Expected ',' or ']' at \(c.pos)")
            }
        }
        c.skipWhitespace()
        guard c.atEnd else { throw ParseError("Unexpected text after array at \(c.pos)") }
        return rows
    }

    /// Removes whitespace that sits between tokens, leaving a plain string that
    /// can be compared to another one directly. Whitespace inside a quoted value
    /// is part of the value and is kept.
    public static func withoutWhitespace(_ text: String) -> String {
        var out = ""
        var inQuotes = false
        var escaped = false
        for c in text {
            if inQuotes {
                out.append(c)
                if escaped {
                    escaped = false
                } else if c == "\\" {
                    escaped = true
                } else if c == "\"" {
                    inQuotes = false
                }
            } else if c == "\"" {
                inQuotes = true
                out.append(c)
            } else if !c.isWhitespace {
                out.append(c)
            }
        }
        return out
    }

    // -------------------------------------------------------------------------

    private static func readObject(_ c: inout Cursor) throws -> [Field] {
        c.skipWhitespace()
        try c.expect("{")
        var fields: [Field] = []
        c.skipWhitespace()
        if c.peek == "}" {
            _ = c.next()
            return fields
        }
        while true {
            c.skipWhitespace()
            let name = try readName(&c)
            c.skipWhitespace()
            try c.expect(":")
            c.skipWhitespace()
            fields.append((name: name, value: try readValue(&c)))
            c.skipWhitespace()
            let d = c.next()
            if d == "," { continue }
            if d == "}" { return fields }
            throw ParseError("Expected ',' or '}' at \(c.pos)")
        }
    }

    /// A name is bare text up to the colon, or a quoted string.
    private static func readName(_ c: inout Cursor) throws -> String {
        if c.peek == "\"" { return try readQuoted(&c) }
        var out = ""
        while !c.atEnd && c.peek != ":" { out.append(c.next()) }
        return out.trimmingCharacters(in: .whitespaces)
    }

    /// A value is a quoted string, or bare text up to the next ',' or '}'.
    private static func readValue(_ c: inout Cursor) throws -> String {
        if c.peek == "\"" { return try readQuoted(&c) }
        var out = ""
        while !c.atEnd && c.peek != "," && c.peek != "}" { out.append(c.next()) }
        return out.trimmingCharacters(in: .whitespaces)
    }

    private static func readQuoted(_ c: inout Cursor) throws -> String {
        try c.expect("\"")
        var out = ""
        while true {
            guard !c.atEnd else { throw ParseError("Unterminated string at \(c.pos)") }
            var ch = c.next()
            if ch == "\"" { return out }
            if ch == "\\" && !c.atEnd { ch = c.next() }
            out.append(ch)
        }
    }

    private struct Cursor {
        private let chars: [Character]
        private var i = 0

        init(_ text: String) { chars = Array(text) }

        var pos: Int { return i }
        var atEnd: Bool { return i >= chars.count }
        var peek: Character { return atEnd ? "\0" : chars[i] }

        mutating func next() -> Character {
            if atEnd { return "\0" }
            let c = chars[i]
            i += 1
            return c
        }

        mutating func skipWhitespace() {
            while !atEnd && chars[i].isWhitespace { i += 1 }
        }

        mutating func expect(_ expected: Character) throws {
            skipWhitespace()
            if next() != expected {
                throw ParseError("Expected '\(expected)' at \(i)")
            }
        }
    }
}
