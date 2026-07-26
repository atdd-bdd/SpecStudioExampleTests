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

         List<ItemPriceInputString> objectList7 = new List<ItemPriceInputString>{
             new ItemPriceInputString("$80"),
         };
         shopping_Cart_glue_object.Then_total_of_items_is(objectList7);

}

[TestMethod]
public void Test_Scenario_A_ShoppingCart_with_Addresses(){
     Shopping_Cart_glue shopping_Cart_glue_object = new Shopping_Cart_glue();

         List<CatalogItemString> objectList8 = new List<CatalogItemString>{
             new CatalogItemString("Widget","10"),
             new CatalogItemString("WhatCallIt","20"),
             new CatalogItemString("ThingaMaJig","30"),
         };
         shopping_Cart_glue_object.Given_catalog_has(objectList8);

         List<ShoppingCartString> objectList9 = new List<ShoppingCartString>{
             new ShoppingCartString("=EmptyCart","$0","$0","$0",new AddressString("2 Apple Lane", "Somewhere", "NC", "27706"),new AddressString("1 Apple Lane", "Somewhere", "NC", "27705")),
         };
         shopping_Cart_glue_object.Given_shopping_cart(objectList9);

}

[TestMethod]
public void Test_Scenario_Add_items_to_Shopping_Cart(){
     Shopping_Cart_glue shopping_Cart_glue_object = new Shopping_Cart_glue();

         List<CatalogItemString> objectList10 = new List<CatalogItemString>{
             new CatalogItemString("Widget","10"),
             new CatalogItemString("WhatCallIt","20"),
             new CatalogItemString("ThingaMaJig","30"),
         };
         shopping_Cart_glue_object.Given_catalog_has(objectList10);

         List<ShoppingCartString> objectList11 = new List<ShoppingCartString>{
             new ShoppingCartString("=EmptyCart","$0","$0","$0",new AddressString("", "", "", ""),new AddressString("", "", "", "")),
         };
         shopping_Cart_glue_object.Given_shopping_cart(objectList11);

         List<OrderItemString> objectList12 = new List<OrderItemString>{
             new OrderItemString("Widget","2","1","1"),
         };
         shopping_Cart_glue_object.When_item_added(objectList12);

         List<OrderItemString> objectList13 = new List<OrderItemString>{
             new OrderItemString("WhatCallIt","3","1","1"),
         };
         shopping_Cart_glue_object.When_item_added(objectList13);

         List<ShoppingCartString> objectList14 = new List<ShoppingCartString>{
             new ShoppingCartString("=TwoItemCart","$5","$4","$81",new AddressString("", "", "", ""),new AddressString("", "", "", "")),
         };
         shopping_Cart_glue_object.Then_shopping_cart_is(objectList14);

}

[TestMethod]
public void Test_Scenario_Cost_of_Empty_OrderItemCollection(){
     Shopping_Cart_glue shopping_Cart_glue_object = new Shopping_Cart_glue();

         List<CatalogItemString> objectList15 = new List<CatalogItemString>{
             new CatalogItemString("Widget","10"),
             new CatalogItemString("WhatCallIt","20"),
             new CatalogItemString("ThingaMaJig","30"),
         };
         shopping_Cart_glue_object.Given_catalog_has(objectList15);

         List<OrderItemString> objectList16 = new List<OrderItemString>{
         };
         shopping_Cart_glue_object.Given_item_collection(objectList16);

         List<ItemPriceInputString> objectList17 = new List<ItemPriceInputString>{
             new ItemPriceInputString("$0"),
         };
         shopping_Cart_glue_object.Then_total_of_items_is(objectList17);

}

// -------------------------
// BusinessRule Tests
// -------------------------
[TestMethod]
public void BusinessRule_Total_Cart_Price(){
     Shopping_Cart_glue glue = new Shopping_Cart_glue();
     List<CartInputString> objectList18 = new List<CartInputString>{
         new CartInputString("$110","$5","$11","$104","Discount applied before shipping calculated"),
         new CartInputString("$80","$5","$4","$81",""),
     };
     glue.Examples_BusinessRule_Total_Cart_Price(objectList18);
}

[TestMethod]
public void BusinessRule_Shipping_Cost(){
     Shopping_Cart_glue glue = new Shopping_Cart_glue();
     List<ShippingInputString> objectList19 = new List<ShippingInputString>{
         new ShippingInputString("$99.99","$5.00","Less than $100"),
         new ShippingInputString("$100.00","$0","Free if $100 or more"),
     };
     glue.Examples_BusinessRule_Shipping_Cost(objectList19);
}

[TestMethod]
public void BusinessRule_Discount(){
     Shopping_Cart_glue glue = new Shopping_Cart_glue();
     List<DiscountInputString> objectList20 = new List<DiscountInputString>{
         new DiscountInputString("$24.99","0",""),
         new DiscountInputString("$25.00","5",""),
         new DiscountInputString("$99.99","5",""),
         new DiscountInputString("$100.00","10",""),
     };
     glue.Examples_BusinessRule_Discount(objectList20);
}

// -------------------------
// DataType Tests
// -------------------------
[TestMethod]
public void DataType_Percentage(){
     Shopping_Cart_glue glue = new Shopping_Cart_glue();
     List<ValidValuesString> objectList21 = new List<ValidValuesString>{
         new ValidValuesString("0","y",""),
         new ValidValuesString("99","y",""),
         new ValidValuesString("100","y",""),
         new ValidValuesString("101","n",""),
         new ValidValuesString("-1","n",""),
     };
     glue.Examples_DataType_Percentage(objectList21);
}

}
}
