package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class CartInputString {
    private static final String DNCString = "?DNC?";

    public DollarString totalItems;
    public DollarString shipping;
    public DollarString discount;
    public DollarString totalPrice;
    public String notes;

    public CartInputString(String totalItems, String shipping, String discount, String totalPrice, String notes) {
        this.totalItems = new DollarString(totalItems);
        this.shipping = new DollarString(shipping);
        this.discount = new DollarString(discount);
        this.totalPrice = new DollarString(totalPrice);
        this.notes = notes;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static CartInputString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 5, "CartInput");
        return new CartInputString(parts.get(0), parts.get(1), parts.get(2), parts.get(3), parts.get(4));
    }

    public CartInputString(String text) {
        CartInputString parsed = fromText(text);
        this.totalItems = parsed.totalItems;
        this.shipping = parsed.shipping;
        this.discount = parsed.discount;
        this.totalPrice = parsed.totalPrice;
        this.notes = parsed.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CartInputString)) return false;
        CartInputString that = (CartInputString) o;
        return (DNCString.equals(totalItems.value) || DNCString.equals(that.totalItems.value) || Objects.equals(totalItems.value, that.totalItems.value))
            && (DNCString.equals(shipping.value) || DNCString.equals(that.shipping.value) || Objects.equals(shipping.value, that.shipping.value))
            && (DNCString.equals(discount.value) || DNCString.equals(that.discount.value) || Objects.equals(discount.value, that.discount.value))
            && (DNCString.equals(totalPrice.value) || DNCString.equals(that.totalPrice.value) || Objects.equals(totalPrice.value, that.totalPrice.value))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalItems, shipping, discount, totalPrice, notes);
    }

    @Override
    public String toString() {
        return Tokens.token(totalItems.value) + " " + Tokens.token(shipping.value) + " " + Tokens.token(discount.value) + " " + Tokens.token(totalPrice.value) + " " + Tokens.token(notes);
    }
}
