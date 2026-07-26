#pragma once

struct OrderItem {
    SimpleText Name = "No Name";
    int Quantity = 1;
    Dollar Price = "1";
    Dollar ItemTotal = "1";

    OrderItem(SimpleText Name_, int Quantity_, Dollar Price_, Dollar ItemTotal_)
        : Name(Name_), Quantity(Quantity_), Price(Price_), ItemTotal(ItemTotal_) {}
};
