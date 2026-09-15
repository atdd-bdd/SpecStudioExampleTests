namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ResponseString
    {
        public ResultString result;

        public ResponseString(ResultString result)
        {
            this.result = result;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ResponseString FromText(string text)
        {
            var parts = Tokens.Require(text, 1, "Response");
            return new ResponseString(ResultString.FromText(parts[0]));
        }

        public ResponseString(string text)
        {
            var parsed = FromText(text);
            this.result = parsed.result;
        }

        public ResponseTyped ToResponseTyped()
        {
            return new ResponseTyped(
                this.result.ToResultTyped()
            );
        }

        public override string ToString()
        {
            return Tokens.Nested(result == null ? "" : result.ToString());
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ResponseString other) return false;
            return object.Equals(this.result, other.result);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.result);
            return h.ToHashCode();
        }
    }
}
