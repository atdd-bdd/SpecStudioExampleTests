package production;

import java.math.BigDecimal;
import java.util.Objects;

public class ShoppingCart {
    public final OrderItemCollection items;
    public final Dollar shipping;
    public final Dollar discount;
    public final Dollar totalPrice;
    public final Address shippingAddress;
    public final Address billingAddress;

    public ShoppingCart(OrderItemCollection items, Dollar shipping, Dollar discount, Dollar totalPrice, Address shippingAddress, Address billingAddress) {
        this.items = items;
        this.shipping = shipping;
        this.discount = discount;
        this.totalPrice = totalPrice;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
    }

    /** What the items come to before any discount or shipping. */
    public Dollar subtotal() {
        return items.computeTotal();
    }

    /**
     * The discount as money: the tiered percentage applied to the subtotal.
     * The Discount rule states a Percentage, while the cart carries a Dollar.
     */
    public Dollar discountAmount() {
        Dollar amount = subtotal();
        return amount.times(discountFor(amount));
    }

    /**
     * Shipping is charged on what the customer actually pays, so the discount
     * comes off before the $100 threshold is tested. Both readings agree on the
     * specification's own example — $80 and $76 are each under $100 — and this
     * one follows its Details line, "Apply Discount to OrderItem Total, then
     * add shipping".
     */
    public Dollar shippingCost() {
        return shippingCostFor(subtotal().minus(discountAmount()));
    }

    /** Subtotal, less the discount, plus shipping. */
    public Dollar computeTotal() {
        return subtotal().minus(discountAmount()).plus(shippingCost());
    }

    // Shipping is free once the order total reaches $100, otherwise a flat $5.
    public static Dollar shippingCostFor(Dollar totalPrice) {
        return totalPrice.toDecimal().compareTo(new BigDecimal("100.00")) >= 0
            ? new Dollar("0") : new Dollar("5.00");
    }

    // Tiered discount: <$25 -> 0%, $25-$99.99 -> 5%, $100+ -> 10%.
    public static Percentage discountFor(Dollar totalPrice) {
        BigDecimal amount = totalPrice.toDecimal();
        if (amount.compareTo(new BigDecimal("100.00")) >= 0) return new Percentage(10L);
        if (amount.compareTo(new BigDecimal("25.00")) >= 0) return new Percentage(5L);
        return new Percentage(0L);
    }

    public static class Builder {
        private OrderItemCollection items;
        private Dollar shipping;
        private Dollar discount;
        private Dollar totalPrice;
        private Address shippingAddress;
        private Address billingAddress;

        public Builder items(OrderItemCollection items) { this.items = items; return this; }
        public Builder shipping(Dollar shipping) { this.shipping = shipping; return this; }
        public Builder discount(Dollar discount) { this.discount = discount; return this; }
        public Builder totalPrice(Dollar totalPrice) { this.totalPrice = totalPrice; return this; }
        public Builder shippingAddress(Address shippingAddress) { this.shippingAddress = shippingAddress; return this; }
        public Builder billingAddress(Address billingAddress) { this.billingAddress = billingAddress; return this; }

        public ShoppingCart build() {
            return new ShoppingCart(items, shipping, discount, totalPrice, shippingAddress, billingAddress);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShoppingCart)) return false;
        ShoppingCart that = (ShoppingCart) o;
        return Objects.equals(items, that.items)
            && Objects.equals(shipping, that.shipping)
            && Objects.equals(discount, that.discount)
            && Objects.equals(totalPrice, that.totalPrice)
            && Objects.equals(shippingAddress, that.shippingAddress)
            && Objects.equals(billingAddress, that.billingAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(items, shipping, discount, totalPrice, shippingAddress, billingAddress);
    }

    @Override
    public String toString() {
        return "ShoppingCart{" + "Items=" + items + ", " + "Shipping=" + shipping + ", " + "Discount=" + discount + ", " + "TotalPrice=" + totalPrice + ", " + "ShippingAddress=" + shippingAddress + ", " + "BillingAddress=" + billingAddress + "}";
    }
}
