package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ShippingInputString {
    private static final String DNCString = "?DNC?";

    public DollarString totalPrice;
    public DollarString shippingCost;
    public String notes;

    public ShippingInputString(String totalPrice, String shippingCost, String notes) {
        this.totalPrice = new DollarString(totalPrice);
        this.shippingCost = new DollarString(shippingCost);
        this.notes = notes;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ShippingInputString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 3, "ShippingInput");
        return new ShippingInputString(parts.get(0), parts.get(1), parts.get(2));
    }

    public ShippingInputString(String text) {
        ShippingInputString parsed = fromText(text);
        this.totalPrice = parsed.totalPrice;
        this.shippingCost = parsed.shippingCost;
        this.notes = parsed.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShippingInputString)) return false;
        ShippingInputString that = (ShippingInputString) o;
        return (DNCString.equals(totalPrice.value) || DNCString.equals(that.totalPrice.value) || Objects.equals(totalPrice.value, that.totalPrice.value))
            && (DNCString.equals(shippingCost.value) || DNCString.equals(that.shippingCost.value) || Objects.equals(shippingCost.value, that.shippingCost.value))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice, shippingCost, notes);
    }

    @Override
    public String toString() {
        return Tokens.token(totalPrice.value) + " " + Tokens.token(shippingCost.value) + " " + Tokens.token(notes);
    }
}
