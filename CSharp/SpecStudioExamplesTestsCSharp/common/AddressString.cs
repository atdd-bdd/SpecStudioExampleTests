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
    }
}
