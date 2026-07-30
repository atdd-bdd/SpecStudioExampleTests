import XCTest

public class JsonGlue {
    public init() {}

    private var simpleClassValues: [SimpleClassString] = []
    private var givenJson = ""
    private var actualJson = ""
    private var parsedObject: [SimpleClassString] = []

    // SimpleJson takes plain name/value pairs, so it stays independent of the
    // generated test structs. These two moves are the whole of the mapping — the
    // conversion itself belongs to SimpleJson.
    private static func fieldsOf(_ value: SimpleClassString) -> [SimpleJson.Field] {
        return [(name: "anInt", value: value.anInt),
                (name: "aString", value: value.aString)]
    }

    private static func objectOf(_ fields: [SimpleJson.Field]) -> SimpleClassString {
        var anInt = ""
        var aString = ""
        for f in fields {
            if f.name == "anInt" { anInt = f.value }
            if f.name == "aString" { aString = f.value }
        }
        return SimpleClassString(anInt: anInt, aString: aString)
    }

    public func givenOneObjectIs(_ values: [SimpleClassString]) {
        for value in values { print(value) }
        simpleClassValues = values
        actualJson = SimpleJson.toObject(JsonGlue.fieldsOf(values[0]))
    }

    public func thenJsonShouldBe(_ value: String) {
        print(value)
        // Text to text, with the whitespace between tokens removed from both
        // sides. Whitespace inside a quoted value is kept.
        XCTAssertEqual(SimpleJson.withoutWhitespace(value),
                       SimpleJson.withoutWhitespace(actualJson))
    }

    public func givenJsonIs(_ value: String) {
        print(value)
        givenJson = value
        do {
            parsedObject = [JsonGlue.objectOf(try SimpleJson.parseObject(value))]
        } catch {
            XCTFail("bad json: \(error)")
        }
    }

    public func thenTheConvertedObjectIs(_ values: [SimpleClassString]) {
        for value in values { print(value) }
        XCTAssertEqual(values, parsedObject)
    }

    public func givenATableIs(_ values: [SimpleClassString]) {
        for value in values { print(value) }
        simpleClassValues = values
        actualJson = SimpleJson.toArray(values.map { JsonGlue.fieldsOf($0) })
    }

    public func thenJsonForTableShouldBe(_ value: String) {
        print(value)
        XCTAssertEqual(SimpleJson.withoutWhitespace(value),
                       SimpleJson.withoutWhitespace(actualJson))
    }

    public func givenJsonForTableIs(_ value: String) {
        print(value)
        givenJson = value
        do {
            parsedObject = try SimpleJson.parseArray(value).map { JsonGlue.objectOf($0) }
        } catch {
            XCTFail("bad json: \(error)")
        }
    }

    public func thenTheConvertedTableShouldBe(_ values: [SimpleClassString]) {
        for value in values { print(value) }
        XCTAssertEqual(values, parsedObject)
    }
}
