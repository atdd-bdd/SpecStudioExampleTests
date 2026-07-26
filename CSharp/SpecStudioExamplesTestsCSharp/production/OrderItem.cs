namespace production
{
    public class OrderItem
    {
        public SimpleText Name { get; }
        public int Quantity { get; }
        public Dollar Price { get; }
        public Dollar ItemTotal { get; }

        public OrderItem(SimpleText name, int quantity, Dollar price, Dollar itemTotal)
        {
            Name = name;
            Quantity = quantity;
            Price = price;
            ItemTotal = itemTotal;
        }

        public class Builder
        {
            private SimpleText _name;
            private int _quantity;
            private Dollar _price;
            private Dollar _itemTotal;

            public Builder Name(SimpleText value) { _name = value; return this; }
            public Builder Quantity(int value) { _quantity = value; return this; }
            public Builder Price(Dollar value) { _price = value; return this; }
            public Builder ItemTotal(Dollar value) { _itemTotal = value; return this; }

            public OrderItem Build() =>
                new OrderItem(_name, _quantity, _price, _itemTotal);
        }
    }
}
