#pragma once
#include <gtest/gtest.h>
#include <iostream>
#include <string>
#include <vector>
#include "common/common.h"
#include "production/simple_json.h"

class JsonGlue {
public:
    void given_one_object_is(const std::vector<SimpleClassString>& values) {
        for (const auto& v : values) std::cout << v.to_string() << "\n";
        simple_class_values = values;
        actual_json = simple_json::to_object(fields_of(values[0]));
    }

    void then_json_should_be(const std::string& value) {
        std::cout << value << "\n";
        // Text to text, with the whitespace between tokens removed from both
        // sides. Whitespace inside a quoted value is kept.
        EXPECT_EQ(simple_json::without_whitespace(value),
                  simple_json::without_whitespace(actual_json));
    }

    void given_json_is(const std::string& value) {
        std::cout << value << "\n";
        given_json = value;
        parsed_object = { object_of(simple_json::parse_object(value)) };
    }

    void then_the_converted_object_is(const std::vector<SimpleClassString>& values) {
        for (const auto& v : values) std::cout << v.to_string() << "\n";
        EXPECT_EQ(values, parsed_object);
    }

    void given_a_table_is(const std::vector<SimpleClassString>& values) {
        for (const auto& v : values) std::cout << v.to_string() << "\n";
        simple_class_values = values;
        std::vector<simple_json::Fields> rows;
        for (const auto& v : values) rows.push_back(fields_of(v));
        actual_json = simple_json::to_array(rows);
    }

    void then_json_for_table_should_be(const std::string& value) {
        std::cout << value << "\n";
        EXPECT_EQ(simple_json::without_whitespace(value),
                  simple_json::without_whitespace(actual_json));
    }

    void given_json_for_table_is(const std::string& value) {
        std::cout << value << "\n";
        given_json = value;
        parsed_object.clear();
        for (const auto& row : simple_json::parse_array(value))
            parsed_object.push_back(object_of(row));
    }

    void then_the_converted_table_should_be(const std::vector<SimpleClassString>& values) {
        for (const auto& v : values) std::cout << v.to_string() << "\n";
        EXPECT_EQ(values, parsed_object);
    }

private:
    // simple_json takes plain name/value pairs, so it stays independent of the
    // generated test structs. These two moves are the whole of the mapping — the
    // conversion itself belongs to simple_json.
    static simple_json::Fields fields_of(const SimpleClassString& value) {
        return { { "anInt", value.anint }, { "aString", value.astring } };
    }

    static SimpleClassString object_of(const simple_json::Fields& fields) {
        SimpleClassString s;
        for (const auto& f : fields) {
            if (f.first == "anInt")   s.anint   = f.second;
            if (f.first == "aString") s.astring = f.second;
        }
        return s;
    }

    std::vector<SimpleClassString> simple_class_values;
    std::string given_json;
    std::string actual_json;
    std::vector<SimpleClassString> parsed_object;
};
