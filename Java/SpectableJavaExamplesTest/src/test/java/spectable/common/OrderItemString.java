package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class OrderItemString {
    private static final String DNCString = "?DNC?";

    public String name;
    public String quantity;
    public String price;
    public String itemTotal;

    public OrderItemString(String name, String quantity, String price, String itemTotal) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.itemTotal = itemTotal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItemString)) return false;
        OrderItemString that = (OrderItemString) o;
        return (DNCString.equals(name) || DNCString.equals(that.name) || Objects.equals(name, that.name))
            && (DNCString.equals(quantity) || DNCString.equals(that.quantity) || Objects.equals(quantity, that.quantity))
            && (DNCString.equals(price) || DNCString.equals(that.price) || Objects.equals(price, that.price))
            && (DNCString.equals(itemTotal) || DNCString.equals(that.itemTotal) || Objects.equals(itemTotal, that.itemTotal));
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, quantity, price, itemTotal);
    }

    @Override
    public String toString() {
        return "Name=" + name + ", " + "Quantity=" + quantity + ", " + "Price=" + price + ", " + "ItemTotal=" + itemTotal;
    }
}
