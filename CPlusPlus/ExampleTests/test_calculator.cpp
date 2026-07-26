#include <gtest/gtest.h>
#include <iostream>
#include "common/common.h"
#include "calculator_glue.h"

TEST(Calculator, Calculation_AddTwoNumbers) {
    CalculatorGlue glue;
    std::vector<AdderString> objectList1 = {
        AdderString::from_vec({"2", "3", "5"}),
        AdderString::from_vec({"10", "20", "30"}),
        AdderString::from_vec({"-1", "1", "0"}),
    };
    glue.examples_calculation_add_two_numbers(objectList1);
}

