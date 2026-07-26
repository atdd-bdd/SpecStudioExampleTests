#pragma once

struct IDValue {
    IDForm ID;
    int Value = 0;

    IDValue(IDForm ID_, int Value_)
        : ID(ID_), Value(Value_) {}
};
