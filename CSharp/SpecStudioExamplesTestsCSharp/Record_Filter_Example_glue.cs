namespace SpecStudioExamplesTestsCSharp.Record_Filter_Example
{
    using System;
    using System.Collections.Generic;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

    public class Record_Filter_Example_glue
    {
        const string DNCString = "?DNC?";

        public void Given_list_of_numbers(List<IDValueString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Given_list_of_numbers");
        }

        public void When_filtered_by_ID_with_value(List<List<string>> values)
        {
            foreach (var row in values)
            {
                Console.WriteLine(string.Join(", ", row));
            }
            Assert.Fail("Not implemented: When_filtered_by_ID_with_value");
        }

        public void Then_sum_is(List<List<string>> values)
        {
            foreach (var row in values)
            {
                Console.WriteLine(string.Join(", ", row));
            }
            Assert.Fail("Not implemented: Then_sum_is");
        }

        public void When_filtered_by(List<FilterValueString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: When_filtered_by");
        }

        public void Then_result(List<ResultValueString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Then_result");
        }

        public void When_element_added(List<IDValueString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: When_element_added");
        }

        public void Examples_Calculation_Convert_F_to_C(List<FandCString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_Calculation_Convert_F_to_C");
        }

        public void Examples_DataType_IDForm(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_DataType_IDForm");
        }

        public void Examples_Calculation_Add_two_numbers(List<AdderString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_Calculation_Add_two_numbers");
        }

        public void Examples_BusinessRule_Shipping_Cost(List<ShippingString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_BusinessRule_Shipping_Cost");
        }

        public void Examples_BusinessRule_Discount(List<DiscountingString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_BusinessRule_Discount");
        }

        public void Examples_DataType_Percentage(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_DataType_Percentage");
        }

        public void Examples_DataType_Dollar(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_DataType_Dollar");
        }

        public void Examples_DataType_SimpleText(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_DataType_SimpleText");
        }

    }
}
