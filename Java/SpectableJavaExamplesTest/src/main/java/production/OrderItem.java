package production;

import java.util.Objects;

public class OrderItem {
    public final SimpleText name;
    public final int quantity;
    public final Dollar price;
    public final Dollar itemTotal;

    public OrderItem(SimpleText name, int quantity, Dollar price, Dollar itemTotal) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.itemTotal = itemTotal;
    }

    public static OrderItem create(SimpleText name, int quantity, Dollar price) {
        return new OrderItem(name, quantity, price, price.times(quantity));
    }

    // Looks up the price in catalog rather than being told it explicitly.
    public static OrderItem create(Catalog catalog, SimpleText name, int quantity) {
        return create(name, quantity, catalog.priceFor(name));
    }

    public static class Builder {
        private SimpleText name;
        private int quantity;
        private Dollar price;
        private Dollar itemTotal;

        public Builder name(SimpleText name) { this.name = name; return this; }
        public Builder quantity(int quantity) { this.quantity = quantity; return this; }
        public Builder price(Dollar price) { this.price = price; return this; }
        public Builder itemTotal(Dollar itemTotal) { this.itemTotal = itemTotal; return this; }

        public OrderItem build() {
            return new OrderItem(name, quantity, price, itemTotal);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItem)) return false;
        OrderItem that = (OrderItem) o;
        return Objects.equals(name, that.name)
            && Objects.equals(quantity, that.quantity)
            && Objects.equals(price, that.price)
            && Objects.equals(itemTotal, that.itemTotal);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, quantity, price, itemTotal);
    }

    @Override
    public String toString() {
        return "OrderItem{" + "Name=" + name + ", " + "Quantity=" + quantity + ", " + "Price=" + price + ", " + "ItemTotal=" + itemTotal + "}";
    }
}
