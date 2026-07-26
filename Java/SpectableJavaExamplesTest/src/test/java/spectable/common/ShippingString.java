package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ShippingString {
    private static final String DNCString = "?DNC?";

    public String totalPrice;
    public String shippingCost;
    public String notes;

    public ShippingString(String totalPrice, String shippingCost, String notes) {
        this.totalPrice = totalPrice;
        this.shippingCost = shippingCost;
        this.notes = notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShippingString)) return false;
        ShippingString that = (ShippingString) o;
        return (DNCString.equals(totalPrice) || DNCString.equals(that.totalPrice) || Objects.equals(totalPrice, that.totalPrice))
            && (DNCString.equals(shippingCost) || DNCString.equals(that.shippingCost) || Objects.equals(shippingCost, that.shippingCost))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice, shippingCost, notes);
    }

    @Override
    public String toString() {
        return "Total Price=" + totalPrice + ", " + "Shipping Cost=" + shippingCost + ", " + "Notes=" + notes;
    }
}
