package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class DiscountInputString {
    private static final String DNCString = "?DNC?";

    public DollarString totalPrice;
    public PercentageString discount;
    public String notes;

    public DiscountInputString(String totalPrice, String discount, String notes) {
        this.totalPrice = new DollarString(totalPrice);
        this.discount = new PercentageString(discount);
        this.notes = notes;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static DiscountInputString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 3, "DiscountInput");
        return new DiscountInputString(parts.get(0), parts.get(1), parts.get(2));
    }

    public DiscountInputString(String text) {
        DiscountInputString parsed = fromText(text);
        this.totalPrice = parsed.totalPrice;
        this.discount = parsed.discount;
        this.notes = parsed.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DiscountInputString)) return false;
        DiscountInputString that = (DiscountInputString) o;
        return (DNCString.equals(totalPrice.value) || DNCString.equals(that.totalPrice.value) || Objects.equals(totalPrice.value, that.totalPrice.value))
            && (DNCString.equals(discount.value) || DNCString.equals(that.discount.value) || Objects.equals(discount.value, that.discount.value))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice, discount, notes);
    }

    @Override
    public String toString() {
        return Tokens.token(totalPrice.value) + " " + Tokens.token(discount.value) + " " + Tokens.token(notes);
    }
}
