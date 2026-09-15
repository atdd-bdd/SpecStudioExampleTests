#pragma once
#include <string>

struct AddressComponents {
    std::string zip;
    std::string streetName;
    std::string city;
    std::string preDirection;
    std::string suffixDirection;
    std::string state;
    std::string suffixType;

    AddressComponents(std::string zip_, std::string streetName_, std::string city_, std::string preDirection_, std::string suffixDirection_, std::string state_, std::string suffixType_)
        : zip(zip_), streetName(streetName_), city(city_), preDirection(preDirection_), suffixDirection(suffixDirection_), state(state_), suffixType(suffixType_) {}
};
