package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class MatchString {
    private static final String DNCString = "?DNC?";

    public String matchedAddress;
    public AddressComponentsString addressComponents;

    public MatchString(String matchedAddress, AddressComponentsString addressComponents) {
        this.matchedAddress = matchedAddress;
        this.addressComponents = addressComponents;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static MatchString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 2, "Match");
        return new MatchString(parts.get(0), AddressComponentsString.fromText(parts.get(1)));
    }

    public MatchString(String text) {
        MatchString parsed = fromText(text);
        this.matchedAddress = parsed.matchedAddress;
        this.addressComponents = parsed.addressComponents;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MatchString)) return false;
        MatchString that = (MatchString) o;
        return (DNCString.equals(matchedAddress) || DNCString.equals(that.matchedAddress) || Objects.equals(matchedAddress, that.matchedAddress))
            && Objects.equals(addressComponents, that.addressComponents);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchedAddress, addressComponents);
    }

    @Override
    public String toString() {
        return Tokens.token(matchedAddress) + " " + Tokens.nested(String.valueOf(addressComponents));
    }
}
