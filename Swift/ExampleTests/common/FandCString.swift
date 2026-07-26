public struct FandCString: CustomStringConvertible, Equatable {
    public let f: String
    public let c: String
    public let notes: String

    public init(f: String, c: String, notes: String) {
        self.f = f
        self.c = c
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.f = v.count > 0 ? v[0] : ""
        self.c = v.count > 1 ? v[1] : ""
        self.notes = v.count > 2 ? v[2] : ""
    }

    public var description: String {
        return "F=\(f), C=\(c), Notes=\(notes)"
    }

    public static let dncString = "?DNC?"

    public static func == (a: FandCString, b: FandCString) -> Bool {
        return (a.f == dncString || b.f == dncString || a.f == b.f)
            && (a.c == dncString || b.c == dncString || a.c == b.c)
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
