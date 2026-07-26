namespace production
{
    public class Address
    {
        public SimpleText Street { get; }
        public SimpleText City { get; }
        public SimpleText State { get; }
        public SimpleText ZIP { get; }

        public Address(SimpleText street, SimpleText city, SimpleText state, SimpleText zIP)
        {
            Street = street;
            City = city;
            State = state;
            ZIP = zIP;
        }

        public class Builder
        {
            private SimpleText _street;
            private SimpleText _city;
            private SimpleText _state;
            private SimpleText _zIP;

            public Builder Street(SimpleText value) { _street = value; return this; }
            public Builder City(SimpleText value) { _city = value; return this; }
            public Builder State(SimpleText value) { _state = value; return this; }
            public Builder ZIP(SimpleText value) { _zIP = value; return this; }

            public Address Build() =>
                new Address(_street, _city, _state, _zIP);
        }
    }
}
