namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class AdderString
    {
        public string number1;
        public string number2;
        public string result;

        public AdderString(string number1, string number2, string result)
        {
            this.number1 = number1;
            this.number2 = number2;
            this.result = result;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static AdderString FromText(string text)
        {
            var parts = Tokens.Require(text, 3, "Adder");
            return new AdderString(parts[0], parts[1], parts[2]);
        }

        public AdderString(string text)
        {
            var parsed = FromText(text);
            this.number1 = parsed.number1;
            this.number2 = parsed.number2;
            this.result = parsed.result;
        }

        public AdderTyped ToAdderTyped()
        {
            return new AdderTyped(
                int.Parse(this.number1),
                int.Parse(this.number2),
                int.Parse(this.result)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(number1) + " " + Tokens.Token(number2) + " " + Tokens.Token(result);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not AdderString other) return false;
            return (DNCString == this.number1 || DNCString == other.number1 || object.Equals(this.number1, other.number1))
                && (DNCString == this.number2 || DNCString == other.number2 || object.Equals(this.number2, other.number2))
                && (DNCString == this.result || DNCString == other.result || object.Equals(this.result, other.result));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.number1);
            h.Add(this.number2);
            h.Add(this.result);
            return h.ToHashCode();
        }
    }
}
