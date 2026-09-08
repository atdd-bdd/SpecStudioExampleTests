package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class MatchString {
    private static final String DNCString = "?DNC?";

    public String matchedAddress;
    public String preDirection;
    public String streetName;
    public String suffixType;
    public String suffixDirection;
    public String city;
    public String state;
    public String zip;

    public MatchString(String matchedAddress, String preDirection, String streetName, String suffixType, String suffixDirection, String city, String state, String zip) {
        this.matchedAddress = matchedAddress;
        this.preDirection = preDirection;
        this.streetName = streetName;
        this.suffixType = suffixType;
        this.suffixDirection = suffixDirection;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MatchString)) return false;
        MatchString that = (MatchString) o;
        return (DNCString.equals(matchedAddress) || DNCString.equals(that.matchedAddress) || Objects.equals(matchedAddress, that.matchedAddress))
            && (DNCString.equals(preDirection) || DNCString.equals(that.preDirection) || Objects.equals(preDirection, that.preDirection))
            && (DNCString.equals(streetName) || DNCString.equals(that.streetName) || Objects.equals(streetName, that.streetName))
            && (DNCString.equals(suffixType) || DNCString.equals(that.suffixType) || Objects.equals(suffixType, that.suffixType))
            && (DNCString.equals(suffixDirection) || DNCString.equals(that.suffixDirection) || Objects.equals(suffixDirection, that.suffixDirection))
            && (DNCString.equals(city) || DNCString.equals(that.city) || Objects.equals(city, that.city))
            && (DNCString.equals(state) || DNCString.equals(that.state) || Objects.equals(state, that.state))
            && (DNCString.equals(zip) || DNCString.equals(that.zip) || Objects.equals(zip, that.zip));
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchedAddress, preDirection, streetName, suffixType, suffixDirection, city, state, zip);
    }

    @Override
    public String toString() {
        return "MatchedAddress=" + matchedAddress + ", " + "PreDirection=" + preDirection + ", " + "StreetName=" + streetName + ", " + "SuffixType=" + suffixType + ", " + "SuffixDirection=" + suffixDirection + ", " + "City=" + city + ", " + "State=" + state + ", " + "Zip=" + zip;
    }
}
