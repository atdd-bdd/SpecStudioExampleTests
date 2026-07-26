#pragma once

struct ShoppingCart {
    OrderItemCollection Items = "=EmptyCart";
    Dollar Shipping = "$0";
    Dollar Discount = "$0";
    Dollar TotalPrice = "$0";
    Address ShippingAddress = "=NoAddress";
    Address BillingAddress = "=NoAddress";

    ShoppingCart(OrderItemCollection Items_, Dollar Shipping_, Dollar Discount_, Dollar TotalPrice_, Address ShippingAddress_, Address BillingAddress_)
        : Items(Items_), Shipping(Shipping_), Discount(Discount_), TotalPrice(TotalPrice_), ShippingAddress(ShippingAddress_), BillingAddress(BillingAddress_) {}
};
