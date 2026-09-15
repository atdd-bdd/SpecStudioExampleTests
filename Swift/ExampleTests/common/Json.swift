import Foundation

/// Raised for malformed JSON, a missing field, or a value of the wrong type.
public enum JsonError: Error, CustomStringConvertible {
    case invalid(String)

    public var description: String {
        switch self {
        case .invalid(let message): return message
        }
    }
}

/// Field accessors over JSONSerialization.
///
/// A missing key or a value of the wrong type throws JsonError. An explicit
/// JSON null is passed through as an empty/zero value rather than an error.
public enum Json {

    // -----------------------------------------------------------------
    // Reading
    // -----------------------------------------------------------------

    public static func parseObject(_ text: String) throws -> [String: Any] {
        let value = try parseAny(text)
        guard let object = value as? [String: Any] else {
            throw JsonError.invalid("Expected a JSON object, got \(describe(value))")
        }
        return object
    }

    public static func parseArray(_ text: String) throws -> [Any] {
        let value = try parseAny(text)
        guard let array = value as? [Any] else {
            throw JsonError.invalid("Expected a JSON array, got \(describe(value))")
        }
        return array
    }

    private static func parseAny(_ text: String) throws -> Any {
        guard let data = text.data(using: .utf8) else {
            throw JsonError.invalid("JSON text is not valid UTF-8")
        }
        do {
            return try JSONSerialization.jsonObject(with: data, options: [])
        } catch {
            throw JsonError.invalid("Invalid JSON: \(error.localizedDescription)")
        }
    }

    // -----------------------------------------------------------------
    // Writing
    // -----------------------------------------------------------------

    public static func write(_ value: Any) throws -> String {
        do {
            // sortedKeys keeps the output stable: Swift dictionaries are unordered.
            let data = try JSONSerialization.data(withJSONObject: value,
                                                  options: [.sortedKeys])
            guard let text = String(data: data, encoding: .utf8) else {
                throw JsonError.invalid("Could not encode JSON as UTF-8")
            }
            return text
        } catch let error as JsonError {
            throw error
        } catch {
            throw JsonError.invalid("Could not serialize to JSON: \(error.localizedDescription)")
        }
    }

    // -----------------------------------------------------------------
    // Field accessors
    // -----------------------------------------------------------------

    /// True when the value came from JSON `true`/`false`.
    ///
    /// CFGetTypeID/CFBooleanGetTypeID are CoreFoundation and exist only on
    /// Apple platforms; swift-corelibs-foundation on Windows and Linux hands
    /// back a Swift Bool instead, so each side gets the check it supports.
    private static func isBoolean(_ value: Any) -> Bool {
        #if canImport(Darwin)
        if let number = value as? NSNumber {
            return CFGetTypeID(number) == CFBooleanGetTypeID()
        }
        return false
        #else
        return value is Bool
        #endif
    }

    private static func describe(_ value: Any?) -> String {
        guard let value = value else { return "null" }
        if value is NSNull        { return "null" }
        if value is String        { return "a string" }
        if value is [Any]         { return "an array" }
        if value is [String: Any] { return "an object" }
        if isBoolean(value)       { return "a boolean" }
        if value is NSNumber      { return "a number" }
        if value is Bool          { return "a boolean" }
        return "a number"
    }

    private static func typeError(_ ctx: String, _ expected: String, _ actual: Any?) -> JsonError {
        return JsonError.invalid(
            "JSON field '\(ctx)' is not \(expected) (got \(describe(actual)))")
    }

    public static func require(_ object: [String: Any], _ key: String) throws -> Any {
        guard let value = object[key] else {
            throw JsonError.invalid("Missing JSON field '\(key)'")
        }
        return value
    }

    public static func asString(_ value: Any?, _ ctx: String) throws -> String {
        if value == nil || value is NSNull { return "" }
        if let text = value as? String     { return text }
        if let flag = value as? Bool       { return flag ? "true" : "false" }
        if let number = value as? NSNumber { return number.stringValue }
        throw typeError(ctx, "a string", value)
    }

    public static func asDouble(_ value: Any?, _ ctx: String) throws -> Double {
        if let number = value as? NSNumber { return number.doubleValue }
        if let text = value as? String, let parsed = Double(text.trimmingCharacters(in: .whitespaces)) {
            return parsed
        }
        throw typeError(ctx, "a number", value)
    }

    /// Accepts 7 and 7.0 for an integer field, but not 7.5.
    public static func asInt(_ value: Any?, _ ctx: String) throws -> Int {
        if let number = value as? NSNumber {
            let d = number.doubleValue
            guard d == d.rounded(), d >= Double(Int.min), d <= Double(Int.max) else {
                throw typeError(ctx, "an integer", value)
            }
            return Int(d)
        }
        if let text = value as? String, let parsed = Int(text.trimmingCharacters(in: .whitespaces)) {
            return parsed
        }
        throw typeError(ctx, "an integer", value)
    }

    public static func asBool(_ value: Any?, _ ctx: String) throws -> Bool {
        if let value = value, isBoolean(value) {
            if let number = value as? NSNumber { return number.boolValue }
            if let flag = value as? Bool       { return flag }
        }
        if let flag = value as? Bool { return flag }
        if let text = value as? String {
            switch text.trimmingCharacters(in: .whitespaces).lowercased() {
            case "true", "t", "yes", "y", "1":  return true
            case "false", "f", "no", "n", "0":  return false
            default: break
            }
        }
        throw typeError(ctx, "a boolean", value)
    }

    public static func asObject(_ value: Any?, _ ctx: String) throws -> [String: Any] {
        guard let object = value as? [String: Any] else {
            throw typeError(ctx, "an object", value)
        }
        return object
    }

    /// Reads a field that holds a Collection. A null field is an empty
    /// collection rather than an error: a service that found nothing may send
    /// null, and that is not a malformed reply.
    public static func asArray(_ value: Any?, _ ctx: String) throws -> [Any] {
        if value == nil || value is NSNull { return [] }
        guard let array = value as? [Any] else {
            throw typeError(ctx, "an array", value)
        }
        return array
    }
}
