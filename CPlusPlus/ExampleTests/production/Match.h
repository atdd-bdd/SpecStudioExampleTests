#pragma once
#include <string>
#include "AddressComponents.h"

struct Match {
    std::string matchedAddress;
    ::AddressComponents addressComponents;

    Match(std::string matchedAddress_, ::AddressComponents addressComponents_)
        : matchedAddress(matchedAddress_), addressComponents(addressComponents_) {}
};
