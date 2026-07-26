#include <gtest/gtest.h>
#include <iostream>
#include "common/common.h"
#include "types_glue.h"

TEST(Types, DataType_Dollar) {
    TypesGlue glue;
    std::vector<ValidValuesString> objectList1 = {
        ValidValuesString::from_vec({"0", "true", ""}),
        ValidValuesString::from_vec({"0.01", "true", ""}),
        ValidValuesString::from_vec({"-1", "false", "Negative not allowed"}),
        ValidValuesString::from_vec({"0.001", "false", "Only 2 decimal digits"}),
    };
    glue.examples_datatype_dollar(objectList1);
}

TEST(Types, DataType_SimpleText) {
    TypesGlue glue;
    std::vector<ValidValuesString> objectList2 = {
        ValidValuesString::from_vec({"abc", "y", ""}),
        ValidValuesString::from_vec({"ab.", "y", "period okay"}),
        ValidValuesString::from_vec({"1234567890", "y", "digits"}),
        ValidValuesString::from_vec({"@", "n", ""}),
        ValidValuesString::from_vec({"-a-b", "y", "hyphens"}),
    };
    glue.examples_datatype_simpletext(objectList2);
}

