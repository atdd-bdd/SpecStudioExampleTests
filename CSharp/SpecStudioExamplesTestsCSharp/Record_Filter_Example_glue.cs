namespace SpecStudioExamplesTestsCSharp.Record_Filter_Example
{
    using System;
    using System.Collections.Generic;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
    using production;

    public class Record_Filter_Example_glue
    {
        const string DNCString = "?DNC?";

        private RecordFilter recordFilter = new RecordFilter();
        private int computedSum;

        public void Given_list_of_numbers(List<IDValueString> values)
        {
            recordFilter = new RecordFilter();
            foreach (var value in values)
            {
                var typed = value.ToIDValueTyped();
                recordFilter.Add(new IDValue(typed.iD, typed.value));
            }
        }

        public void When_filtered_by_ID_with_value(List<List<string>> values)
        {
            if (values.Count > 0 && values[0].Count > 0)
                computedSum = recordFilter.SumByLabel(new IDForm(values[0][0]));
        }

        public void Then_sum_is(List<List<string>> values)
        {
            if (values.Count > 0 && values[0].Count > 0)
                Assert.AreEqual(int.Parse(values[0][0].Trim()), computedSum, "Sum");
        }

        public void When_filtered_by(List<FilterValueString> values)
        {
            foreach (var value in values)
                computedSum = recordFilter.SumByLabel(value.ToFilterValueTyped().value);
        }

        public void Then_result(List<ResultValueString> values)
        {
            foreach (var value in values)
                Assert.AreEqual(value.ToResultValueTyped().sum, computedSum, "Filtered sum");
        }

        public void When_element_added(List<IDValueString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToIDValueTyped();
                recordFilter.Add(new IDValue(typed.iD, typed.value));
            }
        }

        public void Examples_Calculation_Convert_F_to_C(List<FandCString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToFandCTyped();
                Assert.AreEqual(typed.c, TemperatureConverter.FahrenheitToCelsius(typed.f),
                                $"Convert {typed.f}F to C");
            }
        }

        public void Examples_DataType_IDForm(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                var vvt = value.ToValidValuesTyped();
                bool failed = false;
                try { new IDForm(vvt.value); } catch (FormatException) { failed = true; }
                Assert.AreEqual(vvt.isValid, !failed, $" Value {vvt.value}");
            }
        }
    }
}
