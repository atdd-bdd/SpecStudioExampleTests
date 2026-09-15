namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ResultString
    {
        public string addressMatches;

        public ResultString(string addressMatches)
        {
            this.addressMatches = addressMatches;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ResultString FromText(string text)
        {
            var parts = Tokens.Require(text, 1, "Result");
            return new ResultString(parts[0]);
        }

        public ResultTyped ToResultTyped()
        {
            return new ResultTyped(
                new List<MatchTyped>()
            );
        }

        public override string ToString()
        {
            return Tokens.Token(addressMatches);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ResultString other) return false;
            return (DNCString == this.addressMatches || DNCString == other.addressMatches || object.Equals(this.addressMatches, other.addressMatches));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.addressMatches);
            return h.ToHashCode();
        }
    }
}
