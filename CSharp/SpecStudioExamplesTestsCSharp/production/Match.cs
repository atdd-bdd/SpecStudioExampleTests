namespace production
{
    public class Match
    {
        public string MatchedAddress { get; }
        public AddressComponents AddressComponents { get; }

        public Match(string matchedAddress, AddressComponents addressComponents)
        {
            MatchedAddress = matchedAddress;
            AddressComponents = addressComponents;
        }

        public class Builder
        {
            private string _matchedAddress;
            private AddressComponents _addressComponents;

            public Builder MatchedAddress(string value) { _matchedAddress = value; return this; }
            public Builder AddressComponents(AddressComponents value) { _addressComponents = value; return this; }

            public Match Build() =>
                new Match(_matchedAddress, _addressComponents);
        }
    }
}
