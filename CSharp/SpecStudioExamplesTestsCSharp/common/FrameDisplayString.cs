namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class FrameDisplayString
    {
        public string frame;
        public string mark1;
        public string mark2;
        public string mark3;
        public string totalScore;

        public FrameDisplayString(string frame, string mark1, string mark2, string mark3, string totalScore)
        {
            this.frame = frame;
            this.mark1 = mark1;
            this.mark2 = mark2;
            this.mark3 = mark3;
            this.totalScore = totalScore;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static FrameDisplayString FromText(string text)
        {
            var parts = Tokens.Require(text, 5, "FrameDisplay");
            return new FrameDisplayString(parts[0], parts[1], parts[2], parts[3], parts[4]);
        }

        public FrameDisplayString(string text)
        {
            var parsed = FromText(text);
            this.frame = parsed.frame;
            this.mark1 = parsed.mark1;
            this.mark2 = parsed.mark2;
            this.mark3 = parsed.mark3;
            this.totalScore = parsed.totalScore;
        }

        public FrameDisplayTyped ToFrameDisplayTyped()
        {
            return new FrameDisplayTyped(
                this.frame,
                this.mark1,
                this.mark2,
                this.mark3,
                this.totalScore
            );
        }

        public override string ToString()
        {
            return Tokens.Token(frame) + " " + Tokens.Token(mark1) + " " + Tokens.Token(mark2) + " " + Tokens.Token(mark3) + " " + Tokens.Token(totalScore);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not FrameDisplayString other) return false;
            return (DNCString == this.frame || DNCString == other.frame || object.Equals(this.frame, other.frame))
                && (DNCString == this.mark1 || DNCString == other.mark1 || object.Equals(this.mark1, other.mark1))
                && (DNCString == this.mark2 || DNCString == other.mark2 || object.Equals(this.mark2, other.mark2))
                && (DNCString == this.mark3 || DNCString == other.mark3 || object.Equals(this.mark3, other.mark3))
                && (DNCString == this.totalScore || DNCString == other.totalScore || object.Equals(this.totalScore, other.totalScore));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.frame);
            h.Add(this.mark1);
            h.Add(this.mark2);
            h.Add(this.mark3);
            h.Add(this.totalScore);
            return h.ToHashCode();
        }
    }
}
