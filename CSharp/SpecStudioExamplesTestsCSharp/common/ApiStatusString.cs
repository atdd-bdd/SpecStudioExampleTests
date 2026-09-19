namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ApiStatusString
    {
        public string code;

        public ApiStatusString(string code)
        {
            this.code = code;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ApiStatusString FromText(string text)
        {
            var parts = Tokens.Require(text, 1, "ApiStatus");
            return new ApiStatusString(parts[0]);
        }

        public ApiStatusTyped ToApiStatusTyped()
        {
            return new ApiStatusTyped(
                int.Parse(this.code)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(code);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ApiStatusString other) return false;
            return (DNCString == this.code || DNCString == other.code || object.Equals(this.code, other.code));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.code);
            return h.ToHashCode();
        }
    }
}
