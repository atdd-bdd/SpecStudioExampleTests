namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class AddressString
    {
        public SimpleTextString street;
        public SimpleTextString city;
        public SimpleTextString state;
        public SimpleTextString zIP;

        public AddressString(SimpleTextString street, SimpleTextString city, SimpleTextString state, SimpleTextString zIP)
        {
            this.street = street;
            this.city = city;
            this.state = state;
            this.zIP = zIP;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static AddressString FromText(string text)
        {
            var parts = Tokens.Require(text, 4, "Address");
            return new AddressString(parts[0], parts[1], parts[2], parts[3]);
        }

        public AddressString(string text)
        {
            var parsed = FromText(text);
            this.street = parsed.street;
            this.city = parsed.city;
            this.state = parsed.state;
            this.zIP = parsed.zIP;
        }

        public AddressTyped ToAddressTyped()
        {
            return new AddressTyped(
                new SimpleTextTyped(this.street),
                new SimpleTextTyped(this.city),
                new SimpleTextTyped(this.state),
                new SimpleTextTyped(this.zIP)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(street) + " " + Tokens.Token(city) + " " + Tokens.Token(state) + " " + Tokens.Token(zIP);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not AddressString other) return false;
            return (DNCString == this.street.Value || DNCString == other.street.Value || this.street.Value == other.street.Value)
                && (DNCString == this.city.Value || DNCString == other.city.Value || this.city.Value == other.city.Value)
                && (DNCString == this.state.Value || DNCString == other.state.Value || this.state.Value == other.state.Value)
                && (DNCString == this.zIP.Value || DNCString == other.zIP.Value || this.zIP.Value == other.zIP.Value);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.street);
            h.Add(this.city);
            h.Add(this.state);
            h.Add(this.zIP);
            return h.ToHashCode();
        }
    }
}
