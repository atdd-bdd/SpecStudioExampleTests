namespace production
{
    public class AddressComponents
    {
        public string Zip { get; }
        public string StreetName { get; }
        public string City { get; }
        public string PreDirection { get; }
        public string SuffixDirection { get; }
        public string State { get; }
        public string SuffixType { get; }

        public AddressComponents(string zip, string streetName, string city, string preDirection, string suffixDirection, string state, string suffixType)
        {
            Zip = zip;
            StreetName = streetName;
            City = city;
            PreDirection = preDirection;
            SuffixDirection = suffixDirection;
            State = state;
            SuffixType = suffixType;
        }

        public class Builder
        {
            private string _zip;
            private string _streetName;
            private string _city;
            private string _preDirection;
            private string _suffixDirection;
            private string _state;
            private string _suffixType;

            public Builder Zip(string value) { _zip = value; return this; }
            public Builder StreetName(string value) { _streetName = value; return this; }
            public Builder City(string value) { _city = value; return this; }
            public Builder PreDirection(string value) { _preDirection = value; return this; }
            public Builder SuffixDirection(string value) { _suffixDirection = value; return this; }
            public Builder State(string value) { _state = value; return this; }
            public Builder SuffixType(string value) { _suffixType = value; return this; }

            public AddressComponents Build() =>
                new AddressComponents(_zip, _streetName, _city, _preDirection, _suffixDirection, _state, _suffixType);
        }
    }
}
