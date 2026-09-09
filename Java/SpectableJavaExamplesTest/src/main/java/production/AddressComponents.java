package production;

import java.util.Objects;

public class AddressComponents {
    public final String zip;
    public final String streetName;
    public final String city;
    public final String preDirection;
    public final String suffixDirection;
    public final String state;
    public final String suffixType;

    public AddressComponents(String zip, String streetName, String city, String preDirection, String suffixDirection, String state, String suffixType) {
        this.zip = zip;
        this.streetName = streetName;
        this.city = city;
        this.preDirection = preDirection;
        this.suffixDirection = suffixDirection;
        this.state = state;
        this.suffixType = suffixType;
    }

    public static class Builder {
        private String zip;
        private String streetName;
        private String city;
        private String preDirection;
        private String suffixDirection;
        private String state;
        private String suffixType;

        public Builder zip(String zip) { this.zip = zip; return this; }
        public Builder streetName(String streetName) { this.streetName = streetName; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder preDirection(String preDirection) { this.preDirection = preDirection; return this; }
        public Builder suffixDirection(String suffixDirection) { this.suffixDirection = suffixDirection; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder suffixType(String suffixType) { this.suffixType = suffixType; return this; }

        public AddressComponents build() {
            return new AddressComponents(zip, streetName, city, preDirection, suffixDirection, state, suffixType);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AddressComponents)) return false;
        AddressComponents that = (AddressComponents) o;
        return Objects.equals(zip, that.zip)
            && Objects.equals(streetName, that.streetName)
            && Objects.equals(city, that.city)
            && Objects.equals(preDirection, that.preDirection)
            && Objects.equals(suffixDirection, that.suffixDirection)
            && Objects.equals(state, that.state)
            && Objects.equals(suffixType, that.suffixType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(zip, streetName, city, preDirection, suffixDirection, state, suffixType);
    }

    @Override
    public String toString() {
        return "AddressComponents{" + "zip=" + zip + ", " + "streetName=" + streetName + ", " + "city=" + city + ", " + "preDirection=" + preDirection + ", " + "suffixDirection=" + suffixDirection + ", " + "state=" + state + ", " + "suffixType=" + suffixType + "}";
    }
}
