#pragma once
#include <gtest/gtest.h>
#include <string>
#include <vector>
#include "common/common.h"
#include "production/domain.h"

class CalculatorGlue {
public:
    void examples_calculation_add_two_numbers(const std::vector<AdderString>& values) {
        for (const auto& value : values) {
            const AdderTyped t = AdderTyped::from_string_struct(value);
            EXPECT_EQ(t.result, calc_.add(t.number1, t.number2))
                << "Add " << t.number1 << " + " << t.number2;
        }
    }

private:
    Calculator calc_;
};
