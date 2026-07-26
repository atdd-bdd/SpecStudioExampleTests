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
        return "TotalItems=" + totalItems + ", " + "Shipping=" + shipping + ", " + "Discount=" + discount + ", " + "Total Price=" + totalPrice + ", " + "Notes=" + notes;
    }
}
