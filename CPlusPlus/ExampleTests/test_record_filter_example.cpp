#include <gtest/gtest.h>
#include <iostream>
#include "common/common.h"
#include "record_filter_example_glue.h"

TEST(RecordFilterExample, Scenario_FilterDataByID) {
    RecordFilterExampleGlue glue;
    std::vector<IDValueString> objectList1 = {
        IDValueString::from_vec({"Q1234", "1"}),
        IDValueString::from_vec({"Q9999", "2"}),
        IDValueString::from_vec({"Q1234", "3"}),
    };
    glue.given_list_of_numbers(objectList1);

    std::vector<std::vector<std::string>> stringListList2 = {
        {"Q1234"},
    };
    glue.when_filtered_by_id_with_value(stringListList2);

    std::vector<std::vector<std::string>> stringListList3 = {
        {"4"},
    };
    glue.then_sum_is(stringListList3);

}

TEST(RecordFilterExample, Scenario_FilterDataAnotherWay) {
    RecordFilterExampleGlue glue;
    std::vector<IDValueString> objectList4 = {
        IDValueString::from_vec({"Q1234", "1"}),
        IDValueString::from_vec({"Q9999", "2"}),
        IDValueString::from_vec({"Q1234", "3"}),
    };
    glue.given_list_of_numbers(objectList4);

    std::vector<FilterValueString> objectList5 = {
        FilterValueString::from_vec({"Q1234"}),
    };
    glue.when_filtered_by(objectList5);

    std::vector<ResultValueString> objectList6 = {
        ResultValueString::from_vec({"4"}),
    };
    glue.then_result(objectList6);

}

TEST(RecordFilterExample, Scenario_AddAnotherValue) {
    RecordFilterExampleGlue glue;
    std::vector<IDValueString> objectList7 = {
        IDValueString::from_vec({"Q1234", "1"}),
        IDValueString::from_vec({"Q9999", "2"}),
        IDValueString::from_vec({"Q1234", "3"}),
    };
    glue.given_list_of_numbers(objectList7);

    std::vector<IDValueString> objectList8 = {
        IDValueString::from_vec({"Q1234", "4"}),
    };
    glue.when_element_added(objectList8);

    std::vector<FilterValueString> objectList9 = {
        FilterValueString::from_vec({"Q1234"}),
    };
    glue.when_filtered_by(objectList9);

    std::vector<ResultValueString> objectList10 = {
        ResultValueString::from_vec({"8"}),
    };
    glue.then_result(objectList10);

}

TEST(RecordFilterExample, Calculation_ConvertFToC) {
    RecordFilterExampleGlue glue;
    std::vector<FandCString> objectList11 = {
        FandCString::from_vec({"32", "0", "Freezing"}),
        FandCString::from_vec({"212", "100", "Boiling"}),
        FandCString::from_vec({"-40", "-40", "Below zero"}),
        FandCString::from_vec({"68", "20", "Photo chem"}),
    };
    glue.examples_calculation_convert_f_to_c(objectList11);
}

TEST(RecordFilterExample, DataType_IDForm) {
    RecordFilterExampleGlue glue;
    std::vector<ValidValuesString> objectList12 = {
        ValidValuesString::from_vec({"Q1234", "true", ""}),
        ValidValuesString::from_vec({"Q123", "false", "Too short"}),
        ValidValuesString::from_vec({"Q12345", "false", "Too long"}),
        ValidValuesString::from_vec({"A1234", "false", "Must begin with Q"}),
    };
    glue.examples_datatype_idform(objectList12);
}

