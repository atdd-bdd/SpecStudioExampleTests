#include <gtest/gtest.h>
#include <iostream>
#include "common/common.h"
#include "json_glue.h"

TEST(Json, Scenario_ConvertToJson) {
    JsonGlue glue;
    std::vector<SimpleClassString> objectList1 = {
        SimpleClassString::from_vec({"1", "B"}),
    };
    glue.given_one_object_is(objectList1);

    glue.then_json_should_be("{anInt:\"1\",aString:\"B\"}");
}

TEST(Json, Scenario_ConvertFromJson) {
    JsonGlue glue;
    glue.given_json_is("{anInt:  \"1\"   ,   aString:\"B\"  }");
    std::vector<SimpleClassString> objectList2 = {
        SimpleClassString::from_vec({"1", "B"}),
    };
    glue.then_the_converted_object_is(objectList2);

}

TEST(Json, Scenario_ConvertToJsonArray) {
    JsonGlue glue;
    std::vector<SimpleClassString> objectList3 = {
        SimpleClassString::from_vec({"1", "B"}),
        SimpleClassString::from_vec({"2", "C"}),
    };
    glue.given_a_table_is(objectList3);

    glue.then_json_for_table_should_be("[ {anInt:\"1\",aString:\"B\"} \n, {anInt:\"2\",aString:\"C\"} \n]");
}

TEST(Json, Scenario_ConvertFromJsonArray) {
    JsonGlue glue;
    glue.given_json_for_table_is("[    {anInt:  \"1\"   ,   aString:\"B\"  },\n{anInt:  \"2\"   ,   aString:\"C\"  }\n]\n");
    std::vector<SimpleClassString> objectList4 = {
        SimpleClassString::from_vec({"1", "B"}),
        SimpleClassString::from_vec({"2", "C"}),
    };
    glue.then_the_converted_table_should_be(objectList4);

}

