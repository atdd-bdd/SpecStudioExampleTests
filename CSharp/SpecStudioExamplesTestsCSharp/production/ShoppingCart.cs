namespace production
{
    public class ShoppingCart
    {
        public OrderItemCollection Items { get; }
        public Dollar Shipping { get; }
        public Dollar Discount { get; }
        public Dollar TotalPrice { get; }
        public Address ShippingAddress { get; }
        public Address BillingAddress { get; }

        public ShoppingCart(OrderItemCollection items, Dollar shipping, Dollar discount, Dollar totalPrice, Address shippingAddress, Address billingAddress)
        {
            Items = items;
            Shipping = shipping;
            Discount = discount;
            TotalPrice = totalPrice;
            ShippingAddress = shippingAddress;
            BillingAddress = billingAddress;
        }

        public class Builder
        {
            private OrderItemCollection _items;
            private Dollar _shipping;
            private Dollar _discount;
            private Dollar _totalPrice;
            private Address _shippingAddress;
            private Address _billingAddress;

            public Builder Items(OrderItemCollection value) { _items = value; return this; }
            public Builder Shipping(Dollar value) { _shipping = value; return this; }
            public Builder Discount(Dollar value) { _discount = value; return this; }
            public Builder TotalPrice(Dollar value) { _totalPrice = value; return this; }
            public Builder ShippingAddress(Address value) { _shippingAddress = value; return this; }
            public Builder BillingAddress(Address value) { _billingAddress = value; return this; }

            public ShoppingCart Build() =>
                new ShoppingCart(_items, _shipping, _discount, _totalPrice, _shippingAddress, _billingAddress);
        }
    }
}
