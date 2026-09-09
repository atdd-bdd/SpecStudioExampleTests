namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class IDValueString
    {
        public string iD;
        public string value;

        public IDValueString(string iD, string value)
        {
            this.iD = iD;
            this.value = value;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static IDValueString FromText(string text)
        {
            var parts = Tokens.Require(text, 2, "IDValue");
            return new IDValueString(parts[0], parts[1]);
        }

        public IDValueString(string text)
        {
            var parsed = FromText(text);
            this.iD = parsed.iD;
            this.value = parsed.value;
        }

        public IDValueTyped ToIDValueTyped()
        {
            return new IDValueTyped(
                new IDForm(this.iD),
                int.Parse(this.value)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(iD) + " " + Tokens.Token(value);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not IDValueString other) return false;
            return (DNCString == this.iD || DNCString == other.iD || object.Equals(this.iD, other.iD))
                && (DNCString == this.value || DNCString == other.value || object.Equals(this.value, other.value));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.iD);
            h.Add(this.value);
            return h.ToHashCode();
        }
    }
}
