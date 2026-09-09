package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ShippingInputString {
    private static final String DNCString = "?DNC?";

    public String totalPrice;
    public String shippingCost;
    public String notes;

    public ShippingInputString(String totalPrice, String shippingCost, String notes) {
        this.totalPrice = totalPrice;
        this.shippingCost = shippingCost;
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
        return Tokens.token(totalPrice) + " " + Tokens.token(shippingCost) + " " + Tokens.token(notes);
    }
}
