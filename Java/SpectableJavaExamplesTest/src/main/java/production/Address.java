package production;

import java.util.Objects;

public class Address {
    public final SimpleText street;
    public final SimpleText city;
    public final SimpleText state;
    public final SimpleText zIP;

    public Address(SimpleText street, SimpleText city, SimpleText state, SimpleText zIP) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zIP = zIP;
    }

    public static class Builder {
        private SimpleText street;
        private SimpleText city;
        private SimpleText state;
        private SimpleText zIP;

        public Builder street(SimpleText street) { this.street = street; return this; }
        public Builder city(SimpleText city) { this.city = city; return this; }
        public Builder state(SimpleText state) { this.state = state; return this; }
        public Builder zIP(SimpleText zIP) { this.zIP = zIP; return this; }

        public Address build() {
            return new Address(street, city, state, zIP);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Address)) return false;
        Address that = (Address) o;
        return Objects.equals(street, that.street)
            && Objects.equals(city, that.city)
            && Objects.equals(state, that.state)
            && Objects.equals(zIP, that.zIP);
    }

    @Override
    public int hashCode() {
        return Objects.hash(street, city, state, zIP);
    }

    @Override
    public String toString() {
        return "Address{" + "Street=" + street + ", " + "City=" + city + ", " + "State=" + state + ", " + "ZIP=" + zIP + "}";
    }
}
