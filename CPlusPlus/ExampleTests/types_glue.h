#pragma once
#include <gtest/gtest.h>
#include <stdexcept>
#include <string>
#include <vector>
#include "common/common.h"
#include "production/datatypes.h"

class TypesGlue {
public:
    void examples_datatype_dollar(const std::vector<ValidValuesString>& values) {
        for (const auto& value : values) {
            const ValidValuesTyped vvt = ValidValuesTyped::from_string_struct(value);
            bool failed = false;
            try { Dollar d(vvt.value); } catch (const std::invalid_argument&) { failed = true; }
            EXPECT_EQ(vvt.isvalid, !failed) << " Value " << vvt.value;
        }
    }

    void examples_datatype_simpletext(const std::vector<ValidValuesString>& values) {
        for (const auto& value : values) {
            const ValidValuesTyped vvt = ValidValuesTyped::from_string_struct(value);
            bool failed = false;
            try { SimpleText s(vvt.value); } catch (const std::invalid_argument&) { failed = true; }
            EXPECT_EQ(vvt.isvalid, !failed) << " Value " << vvt.value;
        }
    }
};
