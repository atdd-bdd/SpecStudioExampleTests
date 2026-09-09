import Foundation

/// The text form of an Entity: its attribute values as space separated
/// tokens, in the order the attributes are declared. A value containing a
/// space is wrapped in double quotes; a nested Entity's own text form is
/// wrapped in single quotes. A run of spaces separates exactly as one does.
public enum Tokens {

    public static func split(_ text: String) -> [String] {
        let r = Array(text)
        var out: [String] = []
        var i = 0
        while i < r.count {
            while i < r.count && r[i].isWhitespace { i += 1 }
            if i >= r.count { break }
            let c = r[i]
            if c == "\"" || c == "'" {
                if let close = closingQuote(r, i, c) {
                    out.append(String(r[(i + 1)..<close]))
                    i = close + 1
                } else {
                    out.append(String(r[(i + 1)...]))
                    break
                }
            } else {
                var j = i
                while j < r.count && !r[j].isWhitespace { j += 1 }
                out.append(String(r[i..<j]))
                i = j
            }
        }
        return out
    }

    // The closing quote is the next one of the same kind followed by
    // whitespace or the end of the text, which is what lets a nested Entity,
    // itself single quoted, sit inside a single quoted value.
    private static func closingQuote(_ r: [Character], _ open: Int,
                                     _ quote: Character) -> Int? {
        var j = open + 1
        while j < r.count {
            if r[j] == quote && (j + 1 == r.count || r[j + 1].isWhitespace) {
                return j
            }
            j += 1
        }
        return nil
    }

    public static func token(_ value: String) -> String {
        if value.isEmpty { return "\"\"" }
        if value.contains(where: { $0.isWhitespace }) {
            return "\"" + value + "\""
        }
        return value
    }

    public static func nested(_ text: String) -> String {
        return "'" + text + "'"
    }

    public static func require(_ text: String, _ expected: Int,
                               _ typeName: String) -> [String] {
        let parts = split(text)
        precondition(parts.count == expected,
            "\(typeName) takes \(expected) values but got \(parts.count): \(text)")
        return parts
    }
}
