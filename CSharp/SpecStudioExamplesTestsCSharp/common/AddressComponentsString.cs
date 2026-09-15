namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class AddressComponentsString
    {
        public string zip;
        public string streetName;
        public string city;
        public string preDirection;
        public string suffixDirection;
        public string state;
        public string suffixType;

        public AddressComponentsString(string zip, string streetName, string city, string preDirection, string suffixDirection, string state, string suffixType)
        {
            this.zip = zip;
            this.streetName = streetName;
            this.city = city;
            this.preDirection = preDirection;
            this.suffixDirection = suffixDirection;
            this.state = state;
            this.suffixType = suffixType;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static AddressComponentsString FromText(string text)
        {
            var parts = Tokens.Require(text, 7, "AddressComponents");
            return new AddressComponentsString(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6]);
        }

        public AddressComponentsString(string text)
        {
            var parsed = FromText(text);
            this.zip = parsed.zip;
            this.streetName = parsed.streetName;
            this.city = parsed.city;
            this.preDirection = parsed.preDirection;
            this.suffixDirection = parsed.suffixDirection;
            this.state = parsed.state;
            this.suffixType = parsed.suffixType;
        }

        public AddressComponentsTyped ToAddressComponentsTyped()
        {
            return new AddressComponentsTyped(
                this.zip,
                this.streetName,
                this.city,
                this.preDirection,
                this.suffixDirection,
                this.state,
                this.suffixType
            );
        }

        public override string ToString()
        {
            return Tokens.Token(zip) + " " + Tokens.Token(streetName) + " " + Tokens.Token(city) + " " + Tokens.Token(preDirection) + " " + Tokens.Token(suffixDirection) + " " + Tokens.Token(state) + " " + Tokens.Token(suffixType);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not AddressComponentsString other) return false;
            return (DNCString == this.zip || DNCString == other.zip || object.Equals(this.zip, other.zip))
                && (DNCString == this.streetName || DNCString == other.streetName || object.Equals(this.streetName, other.streetName))
                && (DNCString == this.city || DNCString == other.city || object.Equals(this.city, other.city))
                && (DNCString == this.preDirection || DNCString == other.preDirection || object.Equals(this.preDirection, other.preDirection))
                && (DNCString == this.suffixDirection || DNCString == other.suffixDirection || object.Equals(this.suffixDirection, other.suffixDirection))
                && (DNCString == this.state || DNCString == other.state || object.Equals(this.state, other.state))
                && (DNCString == this.suffixType || DNCString == other.suffixType || object.Equals(this.suffixType, other.suffixType));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.zip);
            h.Add(this.streetName);
            h.Add(this.city);
            h.Add(this.preDirection);
            h.Add(this.suffixDirection);
            h.Add(this.state);
            h.Add(this.suffixType);
            return h.ToHashCode();
        }
    }
}
