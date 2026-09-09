namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ResultValueString
    {
        public string sum;

        public ResultValueString(string sum)
        {
            this.sum = sum;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ResultValueString FromText(string text)
        {
            var parts = Tokens.Require(text, 1, "ResultValue");
            return new ResultValueString(parts[0]);
        }

        public ResultValueTyped ToResultValueTyped()
        {
            return new ResultValueTyped(
                int.Parse(this.sum)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(sum);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ResultValueString other) return false;
            return (DNCString == this.sum || DNCString == other.sum || object.Equals(this.sum, other.sum));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.sum);
            return h.ToHashCode();
        }
    }
}
