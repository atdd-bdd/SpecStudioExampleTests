#pragma once

struct Address {
    SimpleText Street;
    SimpleText City;
    SimpleText State;
    SimpleText ZIP;

    Address(SimpleText Street_, SimpleText City_, SimpleText State_, SimpleText ZIP_)
        : Street(Street_), City(City_), State(State_), ZIP(ZIP_) {}
};
