package spectable.tests;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import spectable.Shopping_Cart_glue;
import production.*;
import records.*;
import calculator.*;
import org.junit.jupiter.api.Test;

public class Shopping_Cart_Test {

    // -------------------------
    // Scenario Tests
    // -------------------------
    @Test
    public void Scenario_Add_items() {
        Shopping_Cart_glue glue = new Shopping_Cart_glue();

        List<CatalogItemString> objectList1 = new ArrayList<>();
        objectList1.add(new CatalogItemString("Widget", "10"));
        objectList1.add(new CatalogItemString("WhatCallIt", "20"));
        objectList1.add(new CatalogItemString("ThingaMaJig", "30"));
        glue.Given_catalog_has(objectList1);

        List<OrderItemString> objectList2 = new ArrayList<>();
        glue.Given_item_collection_is(objectList2);

        List<OrderItemString> objectList3 = new ArrayList<>();
        objectList3.add(new OrderItemString("Widget", "2", "1", "1"));
        glue.When_item_added(objectList3);

        List<OrderItemString> objectList4 = new ArrayList<>();
        objectList4.add(new OrderItemString("Widget", "2", "$10.00", "$20.00"));
        glue.Then_item_collection_is(objectList4);

        List<OrderItemString> objectList5 = new ArrayList<>();
        objectList5.add(new OrderItemString("WhatCallIt", "3", "1", "1"));
        glue.When_item_added(objectList5);

        List<OrderItemString> objectList6 = new ArrayList<>();
        objectList6.add(new OrderItemString("Widget", "2", "$10.00", "$20.00"));
        objectList6.add(new OrderItemString("WhatCallIt", "3", "$20.00", "$60.00"));
        glue.Then_item_collection_is(objectList6);

        List<ItemPriceInputString> objectList7 = new ArrayList<>();
        objectList7.add(new ItemPriceInputString("$80"));
        glue.Then_total_of_items_is(objectList7);

    }

    @Test
    public void Scenario_A_ShoppingCart_with_Addresses() {
        Shopping_Cart_glue glue = new Shopping_Cart_glue();

        List<CatalogItemString> objectList8 = new ArrayList<>();
        objectList8.add(new CatalogItemString("Widget", "10"));
        objectList8.add(new CatalogItemString("WhatCallIt", "20"));
        objectList8.add(new CatalogItemString("ThingaMaJig", "30"));
        glue.Given_catalog_has(objectList8);

        List<ShoppingCartString> objectList9 = new ArrayList<>();
        objectList9.add(new ShoppingCartString(
                "=EmptyCart",
                "$0",
                "$0",
                "$0",
                new AddressString("2 Apple Lane", "Somewhere", "NC", "27706"),
                new AddressString("1 Apple Lane", "Somewhere", "NC", "27705")));
        glue.Given_shopping_cart(objectList9);

    }

    @Test
    public void Scenario_Add_items_to_Shopping_Cart() {
        Shopping_Cart_glue glue = new Shopping_Cart_glue();

        List<CatalogItemString> objectList10 = new ArrayList<>();
        objectList10.add(new CatalogItemString("Widget", "10"));
        objectList10.add(new CatalogItemString("WhatCallIt", "20"));
        objectList10.add(new CatalogItemString("ThingaMaJig", "30"));
        glue.Given_catalog_has(objectList10);

        List<ShoppingCartString> objectList11 = new ArrayList<>();
        objectList11.add(new ShoppingCartString(
                "=EmptyCart",
                "$0",
                "$0",
                "$0",
                new AddressString("", "", "", ""),
                new AddressString("", "", "", "")));
        glue.Given_shopping_cart(objectList11);

        List<OrderItemString> objectList12 = new ArrayList<>();
        objectList12.add(new OrderItemString("Widget", "2", "1", "1"));
        glue.When_item_added(objectList12);

        List<OrderItemString> objectList13 = new ArrayList<>();
        objectList13.add(new OrderItemString("WhatCallIt", "3", "1", "1"));
        glue.When_item_added(objectList13);

        List<ShoppingCartString> objectList14 = new ArrayList<>();
        objectList14.add(new ShoppingCartString(
                "=TwoItemCart",
                "$5",
                "$4",
                "$81",
                new AddressString("", "", "", ""),
                new AddressString("", "", "", "")));
        glue.Then_shopping_cart_is(objectList14);

    }

    @Test
    public void Scenario_Cost_of_Empty_OrderItemCollection() {
        Shopping_Cart_glue glue = new Shopping_Cart_glue();

        List<CatalogItemString> objectList15 = new ArrayList<>();
        objectList15.add(new CatalogItemString("Widget", "10"));
        objectList15.add(new CatalogItemString("WhatCallIt", "20"));
        objectList15.add(new CatalogItemString("ThingaMaJig", "30"));
        glue.Given_catalog_has(objectList15);

        List<OrderItemString> objectList16 = new ArrayList<>();
        glue.Given_item_collection(objectList16);

        List<ItemPriceInputString> objectList17 = new ArrayList<>();
        objectList17.add(new ItemPriceInputString("$0"));
        glue.Then_total_of_items_is(objectList17);

    }

    // -------------------------
    // BusinessRule Tests
    // -------------------------
    @Test
    public void BusinessRule_Total_Cart_Price() {
        Shopping_Cart_glue glue = new Shopping_Cart_glue();
        List<CartInputString> objectList18 = new ArrayList<>();
        objectList18.add(new CartInputString("$110", "$5", "$11", "$104", "Discount applied before shipping calculated"));
        objectList18.add(new CartInputString("$80", "$5", "$4", "$81", ""));
        glue.Examples_BusinessRule_Total_Cart_Price(objectList18);
    }

    @Test
    public void BusinessRule_Shipping_Cost() {
        Shopping_Cart_glue glue = new Shopping_Cart_glue();
        List<ShippingInputString> objectList19 = new ArrayList<>();
        objectList19.add(new ShippingInputString("$99.99", "$5.00", "Less than $100"));
        objectList19.add(new ShippingInputString("$100.00", "$0", "Free if $100 or more"));
        glue.Examples_BusinessRule_Shipping_Cost(objectList19);
    }

    @Test
    public void BusinessRule_Discount() {
        Shopping_Cart_glue glue = new Shopping_Cart_glue();
        List<DiscountInputString> objectList20 = new ArrayList<>();
        objectList20.add(new DiscountInputString("$24.99", "0", ""));
        objectList20.add(new DiscountInputString("$25.00", "5", ""));
        objectList20.add(new DiscountInputString("$99.99", "5", ""));
        objectList20.add(new DiscountInputString("$100.00", "10", ""));
        glue.Examples_BusinessRule_Discount(objectList20);
    }

    // -------------------------
    // DataType Tests
    // -------------------------
    @Test
    public void DataType_Percentage() {
        Shopping_Cart_glue glue = new Shopping_Cart_glue();
        List<ValidValuesString> objectList21 = new ArrayList<>();
        objectList21.add(new ValidValuesString("0", "y", ""));
        objectList21.add(new ValidValuesString("99", "y", ""));
        objectList21.add(new ValidValuesString("100", "y", ""));
        objectList21.add(new ValidValuesString("101", "n", ""));
        objectList21.add(new ValidValuesString("-1", "n", ""));
        glue.Examples_DataType_Percentage(objectList21);
    }

}
