import XCTest

final class JsonTests: XCTestCase {

    func testConvertToJson() {
        let glue = JsonGlue()
        glue.givenOneObjectIs([
            SimpleClassString(fromArray: ["1", "B"]),
        ])
        glue.thenJsonShouldBe("{anInt:\"1\",aString:\"B\"}")
    }

    func testConvertFromJson() {
        let glue = JsonGlue()
        glue.givenJsonIs("{anInt:  \"1\"   ,   aString:\"B\"  }")
        glue.thenTheConvertedObjectIs([
            SimpleClassString(fromArray: ["1", "B"]),
        ])
    }

    func testConvertToJsonArray() {
        let glue = JsonGlue()
        glue.givenATableIs([
            SimpleClassString(fromArray: ["1", "B"]),
            SimpleClassString(fromArray: ["2", "C"]),
        ])
        glue.thenJsonForTableShouldBe("[ {anInt:\"1\",aString:\"B\"} \n, {anInt:\"2\",aString:\"C\"} \n]")
    }

    func testConvertFromJsonArray() {
        let glue = JsonGlue()
        glue.givenJsonForTableIs("[    {anInt:  \"1\"   ,   aString:\"B\"  },\n{anInt:  \"2\"   ,   aString:\"C\"  }\n]\n")
        glue.thenTheConvertedTableShouldBe([
            SimpleClassString(fromArray: ["1", "B"]),
            SimpleClassString(fromArray: ["2", "C"]),
        ])
    }

}
