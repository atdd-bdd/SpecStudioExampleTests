package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class DiscountInputString {
    private static final String DNCString = "?DNC?";

    public String totalPrice;
    public String discount;
    public String notes;

    public DiscountInputString(String totalPrice, String discount, String notes) {
        this.totalPrice = totalPrice;
        this.discount = discount;
        this.notes = notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DiscountInputString)) return false;
        DiscountInputString that = (DiscountInputString) o;
        return (DNCString.equals(totalPrice) || DNCString.equals(that.totalPrice) || Objects.equals(totalPrice, that.totalPrice))
            && (DNCString.equals(discount) || DNCString.equals(that.discount) || Objects.equals(discount, that.discount))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice, discount, notes);
    }

    @Override
    public String toString() {
        return "Total Price=" + totalPrice + ", " + "Discount=" + discount + ", " + "Notes=" + notes;
    }
}
