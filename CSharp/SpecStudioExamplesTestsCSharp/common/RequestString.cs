namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class RequestString
    {
        public string method;
        public string page;
        public string address;
        public string benchmark;
        public string format;

        public RequestString(string method, string page, string address, string benchmark, string format)
        {
            this.method = method;
            this.page = page;
            this.address = address;
            this.benchmark = benchmark;
            this.format = format;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static RequestString FromText(string text)
        {
            var parts = Tokens.Require(text, 5, "Request");
            return new RequestString(parts[0], parts[1], parts[2], parts[3], parts[4]);
        }

        public RequestString(string text)
        {
            var parsed = FromText(text);
            this.method = parsed.method;
            this.page = parsed.page;
            this.address = parsed.address;
            this.benchmark = parsed.benchmark;
            this.format = parsed.format;
        }

        public RequestTyped ToRequestTyped()
        {
            return new RequestTyped(
                this.method,
                this.page,
                this.address,
                this.benchmark,
                this.format
            );
        }

        public override string ToString()
        {
            return Tokens.Token(method) + " " + Tokens.Token(page) + " " + Tokens.Token(address) + " " + Tokens.Token(benchmark) + " " + Tokens.Token(format);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not RequestString other) return false;
            return (DNCString == this.method || DNCString == other.method || object.Equals(this.method, other.method))
                && (DNCString == this.page || DNCString == other.page || object.Equals(this.page, other.page))
                && (DNCString == this.address || DNCString == other.address || object.Equals(this.address, other.address))
                && (DNCString == this.benchmark || DNCString == other.benchmark || object.Equals(this.benchmark, other.benchmark))
                && (DNCString == this.format || DNCString == other.format || object.Equals(this.format, other.format));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.method);
            h.Add(this.page);
            h.Add(this.address);
            h.Add(this.benchmark);
            h.Add(this.format);
            return h.ToHashCode();
        }
    }
}
