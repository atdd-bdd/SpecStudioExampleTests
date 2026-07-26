namespace SpecStudioExamplesTestsCSharp.Shopping_Cart{
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using SpecStudioExamplesTestsCSharp.common;
using production;

[TestClass]
public class Shopping_Cart{

[TestMethod]
public void Test_Scenario_Add_items(){
     Shopping_Cart_glue shopping_Cart_glue_object = new Shopping_Cart_glue();

         List<CatalogItemString> objectList1 = new List<CatalogItemString>{
             new CatalogItemString("Widget","10"),
             new CatalogItemString("WhatCallIt","20"),
             new CatalogItemString("ThingaMaJig","30"),
         };
         shopping_Cart_glue_object.Given_catalog_has(objectList1);

         List<OrderItemString> objectList2 = new List<OrderItemString>{
         };
         shopping_Cart_glue_object.Given_item_collection_is(objectList2);

         List<OrderItemString> objectList3 = new List<OrderItemString>{
             new OrderItemString("Widget","2","1","1"),
         };
         shopping_Cart_glue_object.When_item_added(objectList3);

         List<OrderItemString> objectList4 = new List<OrderItemString>{
             new OrderItemString("Widget","2","$10.00","$20.00"),
         };
         shopping_Cart_glue_object.Then_item_collection_is(objectList4);

         List<OrderItemString> objectList5 = new List<OrderItemString>{
             new OrderItemString("WhatCallIt","3","1","1"),
         };
         shopping_Cart_glue_object.When_item_added(objectList5);

         List<OrderItemString> objectList6 = new List<OrderItemString>{
             new OrderItemString("Widget","2","$10.00","$20.00"),
             new OrderItemString("WhatCallIt","3","$20.00","$60.00"),
         };
         shopping_Cart_glue_object.Then_item_collection_is(objectList6);

}

[TestMethod]
public void Test_Scenario_A_ShoppingCart_with_Addresses(){
     Shopping_Cart_glue shopping_Cart_glue_object = new Shopping_Cart_glue();

         List<CatalogItemString> objectList7 = new List<CatalogItemString>{
             new CatalogItemString("Widget","10"),
             new CatalogItemString("WhatCallIt","20"),
             new CatalogItemString("ThingaMaJig","30"),
         };
         shopping_Cart_glue_object.Given_catalog_has(objectList7);

         List<ShoppingCartString> objectList8 = new List<ShoppingCartString>{
             new ShoppingCartString("=EmptyCart","$0","$0","$0",new AddressString("2 Apple Lane", "Somewhere", "NC", "27706"),new AddressString("1 Apple Lane", "Somewhere", "NC", "27705")),
         };
         shopping_Cart_glue_object.Given_shopping_cart(objectList8);

}

[TestMethod]
public void Test_Scenario_Add_items_to_Shopping_Cart(){
     Shopping_Cart_glue shopping_Cart_glue_object = new Shopping_Cart_glue();

         List<CatalogItemString> objectList9 = new List<CatalogItemString>{
             new CatalogItemString("Widget","10"),
             new CatalogItemString("WhatCallIt","20"),
             new CatalogItemString("ThingaMaJig","30"),
         };
         shopping_Cart_glue_object.Given_catalog_has(objectList9);

         List<ShoppingCartString> objectList10 = new List<ShoppingCartString>{
             new ShoppingCartString("=EmptyCart","$0","$0","$0",new AddressString("", "", "", ""),new AddressString("", "", "", "")),
         };
         shopping_Cart_glue_object.Given_shopping_cart(objectList10);

         List<OrderItemString> objectList11 = new List<OrderItemString>{
             new OrderItemString("Widget","2","1","1"),
         };
         shopping_Cart_glue_object.When_item_added(objectList11);

         List<OrderItemString> objectList12 = new List<OrderItemString>{
             new OrderItemString("WhatCallIt","3","1","1"),
         };
         shopping_Cart_glue_object.When_item_added(objectList12);

         List<ShoppingCartString> objectList13 = new List<ShoppingCartString>{
             new ShoppingCartString("=TwoItemCart","$5","$4","$81",new AddressString("", "", "", ""),new AddressString("", "", "", "")),
         };
         shopping_Cart_glue_object.Then_shopping_cart_is(objectList13);

}

[TestMethod]
public void Test_Scenario_Cost_of_Empty_OrderItemCollection(){
     Shopping_Cart_glue shopping_Cart_glue_object = new Shopping_Cart_glue();

         List<CatalogItemString> objectList14 = new List<CatalogItemString>{
             new CatalogItemString("Widget","10"),
             new CatalogItemString("WhatCallIt","20"),
             new CatalogItemString("ThingaMaJig","30"),
         };
         shopping_Cart_glue_object.Given_catalog_has(objectList14);

         List<OrderItemString> objectList15 = new List<OrderItemString>{
         };
         shopping_Cart_glue_object.Given_item_collection(objectList15);

         shopping_Cart_glue_object.When_total_computed();

         List<PricingString> objectList16 = new List<PricingString>{
             new PricingString("$0"),
         };
         shopping_Cart_glue_object.Then_result_is(objectList16);

}

// -------------------------
// BusinessRule Tests
// -------------------------
[TestMethod]
public void BusinessRule_Shipping_Cost(){
     Shopping_Cart_glue glue = new Shopping_Cart_glue();
     List<ShippingString> objectList17 = new List<ShippingString>{
         new ShippingString("$99.99","$5.00","Less than $100"),
         new ShippingString("$100.00","$0","Free if $100 or more"),
     };
     glue.Examples_BusinessRule_Shipping_Cost(objectList17);
}

[TestMethod]
public void BusinessRule_Discount(){
     Shopping_Cart_glue glue = new Shopping_Cart_glue();
     List<DiscountingString> objectList18 = new List<DiscountingString>{
         new DiscountingString("$24.99","0",""),
         new DiscountingString("$25.00","5",""),
         new DiscountingString("$99.99","5",""),
         new DiscountingString("$100.00","10",""),
     };
     glue.Examples_BusinessRule_Discount(objectList18);
}

// -------------------------
// DataType Tests
// -------------------------
[TestMethod]
public void DataType_Percentage(){
     Shopping_Cart_glue glue = new Shopping_Cart_glue();
     List<ValidValuesString> objectList19 = new List<ValidValuesString>{
         new ValidValuesString("0","y",""),
         new ValidValuesString("99","y",""),
         new ValidValuesString("100","y",""),
         new ValidValuesString("101","n",""),
         new ValidValuesString("-1","n",""),
     };
     glue.Examples_DataType_Percentage(objectList19);
}

}
}
