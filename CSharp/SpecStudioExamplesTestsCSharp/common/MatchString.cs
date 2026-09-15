namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class MatchString
    {
        public string matchedAddress;
        public AddressComponentsString addressComponents;

        public MatchString(string matchedAddress, AddressComponentsString addressComponents)
        {
            this.matchedAddress = matchedAddress;
            this.addressComponents = addressComponents;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static MatchString FromText(string text)
        {
            var parts = Tokens.Require(text, 2, "Match");
            return new MatchString(parts[0], AddressComponentsString.FromText(parts[1]));
        }

        public MatchString(string text)
        {
            var parsed = FromText(text);
            this.matchedAddress = parsed.matchedAddress;
            this.addressComponents = parsed.addressComponents;
        }

        public MatchTyped ToMatchTyped()
        {
            return new MatchTyped(
                this.matchedAddress,
                this.addressComponents.ToAddressComponentsTyped()
            );
        }

        public override string ToString()
        {
            return Tokens.Token(matchedAddress) + " " + Tokens.Nested(addressComponents == null ? "" : addressComponents.ToString());
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not MatchString other) return false;
            return (DNCString == this.matchedAddress || DNCString == other.matchedAddress || object.Equals(this.matchedAddress, other.matchedAddress))
                && object.Equals(this.addressComponents, other.addressComponents);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.matchedAddress);
            h.Add(this.addressComponents);
            return h.ToHashCode();
        }
    }
}
