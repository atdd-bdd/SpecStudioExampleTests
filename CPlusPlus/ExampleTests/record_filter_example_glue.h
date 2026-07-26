#pragma once
#include <gtest/gtest.h>
#include <stdexcept>
#include <string>
#include <vector>
#include "common/common.h"
#include "production/domain.h"

class RecordFilterExampleGlue {
public:
    void given_list_of_numbers(const std::vector<IDValueString>& values) {
        filter_ = RecordFilter();
        for (const auto& value : values) {
            const IDValueTyped t = IDValueTyped::from_string_struct(value);
            filter_.add(IDValue(IDForm(t.id), t.value));
        }
    }

    void when_filtered_by_id_with_value(const std::vector<std::vector<std::string>>& values) {
        if (!values.empty() && !values[0].empty())
            sum_ = filter_.sum_by_label(IDForm(values[0][0]));
    }

    void then_sum_is(const std::vector<std::vector<std::string>>& values) {
        if (!values.empty() && !values[0].empty())
            EXPECT_EQ(std::stoi(values[0][0]), sum_) << "Sum";
    }

    void when_filtered_by(const std::vector<FilterValueString>& values) {
        for (const auto& value : values) {
            const FilterValueTyped t = FilterValueTyped::from_string_struct(value);
            sum_ = filter_.sum_by_label(IDForm(t.value));
        }
    }

    void then_result(const std::vector<ResultValueString>& values) {
        for (const auto& value : values) {
            const ResultValueTyped t = ResultValueTyped::from_string_struct(value);
            EXPECT_EQ(t.sum, sum_) << "Filtered sum";
        }
    }

    void when_element_added(const std::vector<IDValueString>& values) {
        for (const auto& value : values) {
            const IDValueTyped t = IDValueTyped::from_string_struct(value);
            filter_.add(IDValue(IDForm(t.id), t.value));
        }
    }

    void examples_calculation_convert_f_to_c(const std::vector<FandCString>& values) {
        for (const auto& value : values) {
            const FandCTyped t = FandCTyped::from_string_struct(value);
            EXPECT_EQ(t.c, fahrenheit_to_celsius(t.f)) << "Convert " << t.f << "F to C";
        }
    }

    void examples_datatype_idform(const std::vector<ValidValuesString>& values) {
        for (const auto& value : values) {
            const ValidValuesTyped vvt = ValidValuesTyped::from_string_struct(value);
            bool failed = false;
            try { IDForm i(vvt.value); } catch (const std::invalid_argument&) { failed = true; }
            EXPECT_EQ(vvt.isvalid, !failed) << " Value " << vvt.value;
        }
    }

private:
    RecordFilter filter_;
    int sum_ = 0;
};
