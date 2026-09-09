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

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static MatchString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 8, "Match");
        return new MatchString(parts.get(0), parts.get(1), parts.get(2), parts.get(3), parts.get(4), parts.get(5), parts.get(6), parts.get(7));
    }

    public MatchString(String text) {
        MatchString parsed = fromText(text);
        this.matchedAddress = parsed.matchedAddress;
        this.preDirection = parsed.preDirection;
        this.streetName = parsed.streetName;
        this.suffixType = parsed.suffixType;
        this.suffixDirection = parsed.suffixDirection;
        this.city = parsed.city;
        this.state = parsed.state;
        this.zip = parsed.zip;
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
        return Tokens.token(matchedAddress) + " " + Tokens.token(preDirection) + " " + Tokens.token(streetName) + " " + Tokens.token(suffixType) + " " + Tokens.token(suffixDirection) + " " + Tokens.token(city) + " " + Tokens.token(state) + " " + Tokens.token(zip);
    }
}
