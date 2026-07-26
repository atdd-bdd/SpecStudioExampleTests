package spectable.common;

import java.util.Objects;
import production.*;

public class PricingString {
    private static final String DNCString = "?DNC?";

    public String totalPrice;

    public PricingString(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PricingString)) return false;
        PricingString that = (PricingString) o;
        return (DNCString.equals(totalPrice) || DNCString.equals(that.totalPrice) || Objects.equals(totalPrice, that.totalPrice));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice);
    }

    @Override
    public String toString() {
        return "TotalPrice=" + totalPrice;
    }
}
