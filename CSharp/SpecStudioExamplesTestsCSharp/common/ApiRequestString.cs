namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ApiRequestString
    {
        public string method;
        public string page;
        public string parameter;
        public string body;

        public ApiRequestString(string method, string page, string parameter, string body)
        {
            this.method = method;
            this.page = page;
            this.parameter = parameter;
            this.body = body;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ApiRequestString FromText(string text)
        {
            var parts = Tokens.Require(text, 4, "ApiRequest");
            return new ApiRequestString(parts[0], parts[1], parts[2], parts[3]);
        }

        public ApiRequestString(string text)
        {
            var parsed = FromText(text);
            this.method = parsed.method;
            this.page = parsed.page;
            this.parameter = parsed.parameter;
            this.body = parsed.body;
        }

        public ApiRequestTyped ToApiRequestTyped()
        {
            return new ApiRequestTyped(
                this.method,
                this.page,
                this.parameter,
                this.body
            );
        }

        public override string ToString()
        {
            return Tokens.Token(method) + " " + Tokens.Token(page) + " " + Tokens.Token(parameter) + " " + Tokens.Token(body);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ApiRequestString other) return false;
            return (DNCString == this.method || DNCString == other.method || object.Equals(this.method, other.method))
                && (DNCString == this.page || DNCString == other.page || object.Equals(this.page, other.page))
                && (DNCString == this.parameter || DNCString == other.parameter || object.Equals(this.parameter, other.parameter))
                && (DNCString == this.body || DNCString == other.body || object.Equals(this.body, other.body));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.method);
            h.Add(this.page);
            h.Add(this.parameter);
            h.Add(this.body);
            return h.ToHashCode();
        }
    }
}
