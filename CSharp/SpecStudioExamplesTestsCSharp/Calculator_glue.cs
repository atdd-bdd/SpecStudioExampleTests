namespace SpecStudioExamplesTestsCSharp.Calculator
{
    using System;
    using System.Collections.Generic;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

    public class Calculator_glue
    {
        const string DNCString = "?DNC?";

        public void Examples_Calculation_Add_two_numbers(List<AdderString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Examples_Calculation_Add_two_numbers");
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
