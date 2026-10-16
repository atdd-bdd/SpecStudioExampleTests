package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ShoppingCartString {
    private static final String DNCString = "?DNC?";

    public String items;
    public DollarString shipping;
    public DollarString discount;
    public DollarString totalPrice;
    public AddressString shippingAddress;
    public AddressString billingAddress;

    public ShoppingCartString(String items, String shipping, String discount, String totalPrice, AddressString shippingAddress, AddressString billingAddress) {
        this.items = items;
        this.shipping = new DollarString(shipping);
        this.discount = new DollarString(discount);
        this.totalPrice = new DollarString(totalPrice);
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ShoppingCartString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 6, "ShoppingCart");
        return new ShoppingCartString(parts.get(0), parts.get(1), parts.get(2), parts.get(3), AddressString.fromText(parts.get(4)), AddressString.fromText(parts.get(5)));
    }

    public ShoppingCartString(String text) {
        ShoppingCartString parsed = fromText(text);
        this.items = parsed.items;
        this.shipping = parsed.shipping;
        this.discount = parsed.discount;
        this.totalPrice = parsed.totalPrice;
        this.shippingAddress = parsed.shippingAddress;
        this.billingAddress = parsed.billingAddress;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShoppingCartString)) return false;
        ShoppingCartString that = (ShoppingCartString) o;
        return (DNCString.equals(items) || DNCString.equals(that.items) || Objects.equals(items, that.items))
            && (DNCString.equals(shipping.value) || DNCString.equals(that.shipping.value) || Objects.equals(shipping.value, that.shipping.value))
            && (DNCString.equals(discount.value) || DNCString.equals(that.discount.value) || Objects.equals(discount.value, that.discount.value))
            && (DNCString.equals(totalPrice.value) || DNCString.equals(that.totalPrice.value) || Objects.equals(totalPrice.value, that.totalPrice.value))
            && Objects.equals(shippingAddress, that.shippingAddress)
            && Objects.equals(billingAddress, that.billingAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(items, shipping, discount, totalPrice, shippingAddress, billingAddress);
    }

    @Override
    public String toString() {
        return Tokens.token(items) + " " + Tokens.token(shipping.value) + " " + Tokens.token(discount.value) + " " + Tokens.token(totalPrice.value) + " " + Tokens.nested(String.valueOf(shippingAddress)) + " " + Tokens.nested(String.valueOf(billingAddress));
    }
}
