namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class StatusString
    {
        public string code;

        public StatusString(string code)
        {
            this.code = code;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static StatusString FromText(string text)
        {
            var parts = Tokens.Require(text, 1, "Status");
            return new StatusString(parts[0]);
        }

        public StatusTyped ToStatusTyped()
        {
            return new StatusTyped(
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
            if (obj is not StatusString other) return false;
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
