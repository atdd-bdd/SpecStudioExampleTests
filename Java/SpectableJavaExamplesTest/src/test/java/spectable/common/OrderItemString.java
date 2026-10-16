package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class OrderItemString {
    private static final String DNCString = "?DNC?";

    public SimpleTextString name;
    public String quantity;
    public DollarString price;
    public DollarString itemTotal;

    public OrderItemString(String name, String quantity, String price, String itemTotal) {
        this.name = new SimpleTextString(name);
        this.quantity = quantity;
        this.price = new DollarString(price);
        this.itemTotal = new DollarString(itemTotal);
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static OrderItemString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 4, "OrderItem");
        return new OrderItemString(parts.get(0), parts.get(1), parts.get(2), parts.get(3));
    }

    public OrderItemString(String text) {
        OrderItemString parsed = fromText(text);
        this.name = parsed.name;
        this.quantity = parsed.quantity;
        this.price = parsed.price;
        this.itemTotal = parsed.itemTotal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItemString)) return false;
        OrderItemString that = (OrderItemString) o;
        return (DNCString.equals(name.value) || DNCString.equals(that.name.value) || Objects.equals(name.value, that.name.value))
            && (DNCString.equals(quantity) || DNCString.equals(that.quantity) || Objects.equals(quantity, that.quantity))
            && (DNCString.equals(price.value) || DNCString.equals(that.price.value) || Objects.equals(price.value, that.price.value))
            && (DNCString.equals(itemTotal.value) || DNCString.equals(that.itemTotal.value) || Objects.equals(itemTotal.value, that.itemTotal.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, quantity, price, itemTotal);
    }

    @Override
    public String toString() {
        return Tokens.token(name.value) + " " + Tokens.token(quantity) + " " + Tokens.token(price.value) + " " + Tokens.token(itemTotal.value);
    }
}
