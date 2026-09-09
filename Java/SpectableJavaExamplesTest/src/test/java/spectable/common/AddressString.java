package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class AddressString {
    private static final String DNCString = "?DNC?";

    public String street;
    public String city;
    public String state;
    public String zIP;

    public AddressString(String street, String city, String state, String zIP) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zIP = zIP;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static AddressString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 4, "Address");
        return new AddressString(parts.get(0), parts.get(1), parts.get(2), parts.get(3));
    }

    public AddressString(String text) {
        AddressString parsed = fromText(text);
        this.street = parsed.street;
        this.city = parsed.city;
        this.state = parsed.state;
        this.zIP = parsed.zIP;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AddressString)) return false;
        AddressString that = (AddressString) o;
        return (DNCString.equals(street) || DNCString.equals(that.street) || Objects.equals(street, that.street))
            && (DNCString.equals(city) || DNCString.equals(that.city) || Objects.equals(city, that.city))
            && (DNCString.equals(state) || DNCString.equals(that.state) || Objects.equals(state, that.state))
            && (DNCString.equals(zIP) || DNCString.equals(that.zIP) || Objects.equals(zIP, that.zIP));
    }

    @Override
    public int hashCode() {
        return Objects.hash(street, city, state, zIP);
    }

    @Override
    public String toString() {
        return Tokens.token(street) + " " + Tokens.token(city) + " " + Tokens.token(state) + " " + Tokens.token(zIP);
    }
}
