namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class FrameValuesString
    {
        public string frame;
        public PinsString roll1;
        public PinsString roll2;
        public PinsString roll3;
        public ScoreString score;
        public ScoreString totalScore;

        public FrameValuesString(string frame, PinsString roll1, PinsString roll2, PinsString roll3, ScoreString score, ScoreString totalScore)
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
                new PinsTyped(this.roll1),
                new PinsTyped(this.roll2),
                new PinsTyped(this.roll3),
                new ScoreTyped(this.score),
                new ScoreTyped(this.totalScore)
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
                && (DNCString == this.roll1.Value || DNCString == other.roll1.Value || this.roll1.Value == other.roll1.Value)
                && (DNCString == this.roll2.Value || DNCString == other.roll2.Value || this.roll2.Value == other.roll2.Value)
                && (DNCString == this.roll3.Value || DNCString == other.roll3.Value || this.roll3.Value == other.roll3.Value)
                && (DNCString == this.score.Value || DNCString == other.score.Value || this.score.Value == other.score.Value)
                && (DNCString == this.totalScore.Value || DNCString == other.totalScore.Value || this.totalScore.Value == other.totalScore.Value);
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
