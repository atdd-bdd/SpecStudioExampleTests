package spectable;

import java.util.List;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import production.*;
import spectable.common.*;
import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.fail;

public class Json_glue {
    private static final String DNCString = "?DNC?";
    List<SimpleClassString> simpleClassValues = new ArrayList<>();
    String givenJson = "";
    String actualJson = "";
    List<SimpleClassString> parsedObject = new ArrayList<>();

    // SimpleJson takes plain name/value maps: it lives in production and so
    // cannot see the generated test classes. These two moves are the whole of
    // the mapping — the conversion itself belongs to SimpleJson.
    private static LinkedHashMap<String, String> fieldsOf(SimpleClassString value) {
        LinkedHashMap<String, String> fields = new LinkedHashMap<>();
        fields.put("anInt", value.anInt);
        fields.put("aString", value.aString);
        return fields;
    }

    private static SimpleClassString objectOf(Map<String, String> fields) {
        return new SimpleClassString(fields.get("anInt"), fields.get("aString"));
    }

    public void Given_one_object_is(List<SimpleClassString> values) {
        for (SimpleClassString value : values) {
            System.out.println(value);
        }
        simpleClassValues = values;
        actualJson = SimpleJson.toObject(fieldsOf(values.get(0)));
    }

    public void Then_Json_should_be(String value) {
        System.out.println(value);
        // Text to text, with the whitespace between tokens removed from both
        // sides. Whitespace inside a quoted value is kept.
        assertEquals(SimpleJson.withoutWhitespace(value), SimpleJson.withoutWhitespace(actualJson));
    }

    public void Given_Json_is(String value) {
        System.out.println(value);
        givenJson = value;
        parsedObject = new ArrayList<>();
        parsedObject.add(objectOf(SimpleJson.parseObject(value)));
    }

    public void Then_the_converted_object_is(List<SimpleClassString> values) {
        for (SimpleClassString value : values) {
            System.out.println(value);
        }
        assertIterableEquals(values, parsedObject);
    }

    public void Given_a_table_is(List<SimpleClassString> values) {
        for (SimpleClassString value : values) {
            System.out.println(value);
        }
        simpleClassValues = values;
        List<LinkedHashMap<String, String>> rows = new ArrayList<>();
        for (SimpleClassString value : values) {
            rows.add(fieldsOf(value));
        }
        actualJson = SimpleJson.toArray(rows);
    }

    public void Then_Json_for_table_should_be(String value) {
        System.out.println(value);
        assertEquals(SimpleJson.withoutWhitespace(value), SimpleJson.withoutWhitespace(actualJson));
    }

    public void Given_Json_for_table_is(String value) {
        System.out.println(value);
        givenJson = value;
        parsedObject = new ArrayList<>();
        for (Map<String, String> row : SimpleJson.parseArray(value)) {
            parsedObject.add(objectOf(row));
        }
    }

    public void Then_the_converted_table_should_be(List<SimpleClassString> values) {
        for (SimpleClassString value : values) {
            System.out.println(value);
        }
        assertIterableEquals(values, parsedObject);
    }


}
