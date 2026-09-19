namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class FrameValuesString
    {
        public string frame;
        public string roll1;
        public string roll2;
        public string roll3;
        public string score;
        public string totalScore;

        public FrameValuesString(string frame, string roll1, string roll2, string roll3, string score, string totalScore)
        {
            this.frame = frame;
            this.roll1 = roll1;
            this.roll2 = roll2;
            this.roll3 = roll3;
            this.score = score;
            this.totalScore = totalScore;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static FrameValuesString FromText(string text)
        {
            var parts = Tokens.Require(text, 6, "FrameValues");
            return new FrameValuesString(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]);
        }

        public FrameValuesString(string text)
        {
            var parsed = FromText(text);
            this.frame = parsed.frame;
            this.roll1 = parsed.roll1;
            this.roll2 = parsed.roll2;
            this.roll3 = parsed.roll3;
            this.score = parsed.score;
            this.totalScore = parsed.totalScore;
        }

        public FrameValuesTyped ToFrameValuesTyped()
        {
            return new FrameValuesTyped(
                int.Parse(this.frame),
                new Pins(this.roll1),
                new Pins(this.roll2),
                new Pins(this.roll3),
                new Score(this.score),
                new Score(this.totalScore)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(frame) + " " + Tokens.Token(roll1) + " " + Tokens.Token(roll2) + " " + Tokens.Token(roll3) + " " + Tokens.Token(score) + " " + Tokens.Token(totalScore);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not FrameValuesString other) return false;
            return (DNCString == this.frame || DNCString == other.frame || object.Equals(this.frame, other.frame))
                && (DNCString == this.roll1 || DNCString == other.roll1 || object.Equals(this.roll1, other.roll1))
                && (DNCString == this.roll2 || DNCString == other.roll2 || object.Equals(this.roll2, other.roll2))
                && (DNCString == this.roll3 || DNCString == other.roll3 || object.Equals(this.roll3, other.roll3))
                && (DNCString == this.score || DNCString == other.score || object.Equals(this.score, other.score))
                && (DNCString == this.totalScore || DNCString == other.totalScore || object.Equals(this.totalScore, other.totalScore));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.frame);
            h.Add(this.roll1);
            h.Add(this.roll2);
            h.Add(this.roll3);
            h.Add(this.score);
            h.Add(this.totalScore);
            return h.ToHashCode();
        }
    }
}
