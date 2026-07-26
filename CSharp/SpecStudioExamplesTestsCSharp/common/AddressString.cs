namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class AddressString
    {
        public string street;
        public string city;
        public string state;
        public string zIP;

        public AddressString(string street, string city, string state, string zIP)
        {
            this.street = street;
            this.city = city;
            this.state = state;
            this.zIP = zIP;
        }

        public AddressTyped ToAddressTyped()
        {
            return new AddressTyped(
                new SimpleText(this.street),
                new SimpleText(this.city),
                new SimpleText(this.state),
                new SimpleText(this.zIP)
            );
        }

        public override string ToString()
        {
            return $"Street={street}, City={city}, State={state}, ZIP={zIP}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not AddressString other) return false;
            return (DNCString == this.street || DNCString == other.street || object.Equals(this.street, other.street))
                && (DNCString == this.city || DNCString == other.city || object.Equals(this.city, other.city))
                && (DNCString == this.state || DNCString == other.state || object.Equals(this.state, other.state))
                && (DNCString == this.zIP || DNCString == other.zIP || object.Equals(this.zIP, other.zIP));
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
