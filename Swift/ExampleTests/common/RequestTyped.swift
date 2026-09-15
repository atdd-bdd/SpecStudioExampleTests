public struct RequestTyped: Equatable, CustomStringConvertible {
    public let method: String
    public let page: String
    public let address: String
    public let benchmark: String
    public let format: String

    public init(method: String, page: String, address: String, benchmark: String, format: String) {
        self.method = method
        self.page = page
        self.address = address
        self.benchmark = benchmark
        self.format = format
    }

    public init(from s: RequestString) {
        self.method = s.method
        self.page = s.page
        self.address = s.address
        self.benchmark = s.benchmark
        self.format = s.format
    }

    public func toStringStruct() -> RequestString {
        return RequestString(
            method: String(describing: method),
            page: String(describing: page),
            address: String(describing: address),
            benchmark: String(describing: benchmark),
            format: String(describing: format)
        )
    }

    public static func toStringList(_ list: [RequestTyped]) -> [RequestString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [RequestString]) -> [RequestTyped] {
        return list.map { RequestTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "method": method,
            "page": page,
            "address": address,
            "benchmark": benchmark,
            "format": format,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.method = try Json.asString(Json.require(m, "method"), "method")
        self.page = try Json.asString(Json.require(m, "page"), "page")
        self.address = try Json.asString(Json.require(m, "address"), "address")
        self.benchmark = try Json.asString(Json.require(m, "benchmark"), "benchmark")
        self.format = try Json.asString(Json.require(m, "format"), "format")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [RequestTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [RequestTyped] {
        return try Json.parseArray(text).map {
            try RequestTyped(fromJSONValue: Json.asObject($0, "RequestTyped"))
        }
    }

    public var description: String {
        return "Method=\(method), Page=\(page), Address=\(address), Benchmark=\(benchmark), Format=\(format)"
    }
}
