namespace SpecStudioExamplesTestsCSharp.Shopping_Cart
{
    using System;
    using System.Collections.Generic;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

    public class Shopping_Cart_glue
    {
        const string DNCString = "?DNC?";

        public void Given_catalog_has(List<CatalogItemString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Given_catalog_has");
        }

        public void Given_shopping_cart(List<ShoppingCartString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Given_shopping_cart");
        }

        public void When_item_added(List<OrderItemString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: When_item_added");
        }

        public void Then_shopping_cart_is(List<ShoppingCartString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Then_shopping_cart_is");
        }

        public void Given_item_collection(List<OrderItemString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Given_item_collection");
        }

        public void When_total_computed()
        {
            Assert.Fail("Not implemented: When_total_computed");
        }

        public void Then_result_is(List<PricingString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Then_result_is");
        }

        public void Given_item_collection_is(List<OrderItemString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Given_item_collection_is");
        }

        public void Then_item_collection_is(List<OrderItemString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            Assert.Fail("Not implemented: Then_item_collection_is");
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
