package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class AddressString {
    private static final String DNCString = "?DNC?";

    public SimpleTextString street;
    public SimpleTextString city;
    public SimpleTextString state;
    public SimpleTextString zIP;

    public AddressString(String street, String city, String state, String zIP) {
        this.street = new SimpleTextString(street);
        this.city = new SimpleTextString(city);
        this.state = new SimpleTextString(state);
        this.zIP = new SimpleTextString(zIP);
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
        return (DNCString.equals(street.value) || DNCString.equals(that.street.value) || Objects.equals(street.value, that.street.value))
            && (DNCString.equals(city.value) || DNCString.equals(that.city.value) || Objects.equals(city.value, that.city.value))
            && (DNCString.equals(state.value) || DNCString.equals(that.state.value) || Objects.equals(state.value, that.state.value))
            && (DNCString.equals(zIP.value) || DNCString.equals(that.zIP.value) || Objects.equals(zIP.value, that.zIP.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(street, city, state, zIP);
    }

    @Override
    public String toString() {
        return Tokens.token(street.value) + " " + Tokens.token(city.value) + " " + Tokens.token(state.value) + " " + Tokens.token(zIP.value);
    }
}
