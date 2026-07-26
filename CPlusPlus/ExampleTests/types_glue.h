#pragma once
#include <gtest/gtest.h>
#include <iostream>
#include <string>
#include <vector>
#include "common/common.h"

class TypesGlue {
public:
    static constexpr const char* DNC_STRING = "?DNC?";

    void examples_datatype_dollar(const std::vector<ValidValuesString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_datatype_dollar";
    }

    void examples_datatype_simpletext(const std::vector<ValidValuesString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_datatype_simpletext";
    }

    void examples_calculation_add_two_numbers(const std::vector<AdderString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_calculation_add_two_numbers";
    }

    void examples_calculation_convert_f_to_c(const std::vector<FandCString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_calculation_convert_f_to_c";
    }

    void examples_datatype_idform(const std::vector<ValidValuesString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_datatype_idform";
    }

    void examples_businessrule_shipping_cost(const std::vector<ShippingString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_businessrule_shipping_cost";
    }

    void examples_businessrule_discount(const std::vector<DiscountingString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_businessrule_discount";
    }

    void examples_datatype_percentage(const std::vector<ValidValuesString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_datatype_percentage";
    }

};
