package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class AddressComponentsString {
    private static final String DNCString = "?DNC?";

    public String zip;
    public String streetName;
    public String city;
    public String preDirection;
    public String suffixDirection;
    public String state;
    public String suffixType;

    public AddressComponentsString(String zip, String streetName, String city, String preDirection, String suffixDirection, String state, String suffixType) {
        this.zip = zip;
        this.streetName = streetName;
        this.city = city;
        this.preDirection = preDirection;
        this.suffixDirection = suffixDirection;
        this.state = state;
        this.suffixType = suffixType;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static AddressComponentsString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 7, "AddressComponents");
        return new AddressComponentsString(parts.get(0), parts.get(1), parts.get(2), parts.get(3), parts.get(4), parts.get(5), parts.get(6));
    }

    public AddressComponentsString(String text) {
        AddressComponentsString parsed = fromText(text);
        this.zip = parsed.zip;
        this.streetName = parsed.streetName;
        this.city = parsed.city;
        this.preDirection = parsed.preDirection;
        this.suffixDirection = parsed.suffixDirection;
        this.state = parsed.state;
        this.suffixType = parsed.suffixType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AddressComponentsString)) return false;
        AddressComponentsString that = (AddressComponentsString) o;
        return (DNCString.equals(zip) || DNCString.equals(that.zip) || Objects.equals(zip, that.zip))
            && (DNCString.equals(streetName) || DNCString.equals(that.streetName) || Objects.equals(streetName, that.streetName))
            && (DNCString.equals(city) || DNCString.equals(that.city) || Objects.equals(city, that.city))
            && (DNCString.equals(preDirection) || DNCString.equals(that.preDirection) || Objects.equals(preDirection, that.preDirection))
            && (DNCString.equals(suffixDirection) || DNCString.equals(that.suffixDirection) || Objects.equals(suffixDirection, that.suffixDirection))
            && (DNCString.equals(state) || DNCString.equals(that.state) || Objects.equals(state, that.state))
            && (DNCString.equals(suffixType) || DNCString.equals(that.suffixType) || Objects.equals(suffixType, that.suffixType));
    }

    @Override
    public int hashCode() {
        return Objects.hash(zip, streetName, city, preDirection, suffixDirection, state, suffixType);
    }

    @Override
    public String toString() {
        return Tokens.token(zip) + " " + Tokens.token(streetName) + " " + Tokens.token(city) + " " + Tokens.token(preDirection) + " " + Tokens.token(suffixDirection) + " " + Tokens.token(state) + " " + Tokens.token(suffixType);
    }
}
