package production;

import java.util.Objects;

public class Match {
    public final String matchedAddress;
    public final AddressComponents addressComponents;

    public Match(String matchedAddress, AddressComponents addressComponents) {
        this.matchedAddress = matchedAddress;
        this.addressComponents = addressComponents;
    }

    public static class Builder {
        private String matchedAddress;
        private AddressComponents addressComponents;

        public Builder matchedAddress(String matchedAddress) { this.matchedAddress = matchedAddress; return this; }
        public Builder addressComponents(AddressComponents addressComponents) { this.addressComponents = addressComponents; return this; }

        public Match build() {
            return new Match(matchedAddress, addressComponents);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Match)) return false;
        Match that = (Match) o;
        return Objects.equals(matchedAddress, that.matchedAddress)
            && Objects.equals(addressComponents, that.addressComponents);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchedAddress, addressComponents);
    }

    @Override
    public String toString() {
        return "Match{" + "matchedAddress=" + matchedAddress + ", " + "addressComponents=" + addressComponents + "}";
    }
}
