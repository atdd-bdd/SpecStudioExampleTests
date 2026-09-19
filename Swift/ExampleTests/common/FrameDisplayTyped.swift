public struct FrameDisplayTyped: Equatable, CustomStringConvertible {
    public let frame: String
    public let mark1: String
    public let mark2: String
    public let mark3: String
    public let totalScore: String

    public init(frame: String, mark1: String, mark2: String, mark3: String, totalScore: String) {
        self.frame = frame
        self.mark1 = mark1
        self.mark2 = mark2
        self.mark3 = mark3
        self.totalScore = totalScore
    }

    public init(from s: FrameDisplayString) {
        self.frame = s.frame
        self.mark1 = s.mark1
        self.mark2 = s.mark2
        self.mark3 = s.mark3
        self.totalScore = s.totalScore
    }

    public func toStringStruct() -> FrameDisplayString {
        return FrameDisplayString(
            frame: String(describing: frame),
            mark1: String(describing: mark1),
            mark2: String(describing: mark2),
            mark3: String(describing: mark3),
            totalScore: String(describing: totalScore)
        )
    }

    public static func toStringList(_ list: [FrameDisplayTyped]) -> [FrameDisplayString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [FrameDisplayString]) -> [FrameDisplayTyped] {
        return list.map { FrameDisplayTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "frame": frame,
            "mark1": mark1,
            "mark2": mark2,
            "mark3": mark3,
            "totalScore": totalScore,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.frame = try Json.asString(Json.require(m, "frame"), "frame")
        self.mark1 = try Json.asString(Json.require(m, "mark1"), "mark1")
        self.mark2 = try Json.asString(Json.require(m, "mark2"), "mark2")
        self.mark3 = try Json.asString(Json.require(m, "mark3"), "mark3")
        self.totalScore = try Json.asString(Json.require(m, "totalScore"), "totalScore")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [FrameDisplayTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [FrameDisplayTyped] {
        return try Json.parseArray(text).map {
            try FrameDisplayTyped(fromJSONValue: Json.asObject($0, "FrameDisplayTyped"))
        }
    }

    public var description: String {
        return "Frame=\(frame), Mark1=\(mark1), Mark2=\(mark2), Mark3=\(mark3), TotalScore=\(totalScore)"
    }
}
