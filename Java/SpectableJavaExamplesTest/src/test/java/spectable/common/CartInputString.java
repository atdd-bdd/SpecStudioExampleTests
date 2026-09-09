package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class CartInputString {
    private static final String DNCString = "?DNC?";

    public String totalItems;
    public String shipping;
    public String discount;
    public String totalPrice;
    public String notes;

    public CartInputString(String totalItems, String shipping, String discount, String totalPrice, String notes) {
        this.totalItems = totalItems;
        this.shipping = shipping;
        this.discount = discount;
        this.totalPrice = totalPrice;
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
        return (DNCString.equals(totalItems) || DNCString.equals(that.totalItems) || Objects.equals(totalItems, that.totalItems))
            && (DNCString.equals(shipping) || DNCString.equals(that.shipping) || Objects.equals(shipping, that.shipping))
            && (DNCString.equals(discount) || DNCString.equals(that.discount) || Objects.equals(discount, that.discount))
            && (DNCString.equals(totalPrice) || DNCString.equals(that.totalPrice) || Objects.equals(totalPrice, that.totalPrice))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalItems, shipping, discount, totalPrice, notes);
    }

    @Override
    public String toString() {
        return Tokens.token(totalItems) + " " + Tokens.token(shipping) + " " + Tokens.token(discount) + " " + Tokens.token(totalPrice) + " " + Tokens.token(notes);
    }
}
