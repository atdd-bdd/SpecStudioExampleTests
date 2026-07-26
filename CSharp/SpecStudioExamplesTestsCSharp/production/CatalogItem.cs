namespace production
{
    public class CatalogItem
    {
        public SimpleText Name { get; }
        public Dollar Price { get; }

        public CatalogItem(SimpleText name, Dollar price)
        {
            Name = name;
            Price = price;
        }

        public class Builder
        {
            private SimpleText _name;
            private Dollar _price;

            public Builder Name(SimpleText value) { _name = value; return this; }
            public Builder Price(Dollar value) { _price = value; return this; }

            public CatalogItem Build() =>
                new CatalogItem(_name, _price);
        }
    }
}
