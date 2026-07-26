#pragma once

struct CatalogItem {
    SimpleText Name = "NoName";
    Dollar Price = "1";

    CatalogItem(SimpleText Name_, Dollar Price_)
        : Name(Name_), Price(Price_) {}
};
