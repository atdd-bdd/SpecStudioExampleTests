namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class InputControlValuesString
    {
        public string frame;
        public string roll;
        public string remaining;

        public InputControlValuesString(string frame, string roll, string remaining)
        {
            this.frame = frame;
            this.roll = roll;
            this.remaining = remaining;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static InputControlValuesString FromText(string text)
        {
            var parts = Tokens.Require(text, 3, "InputControlValues");
            return new InputControlValuesString(parts[0], parts[1], parts[2]);
        }

        public InputControlValuesString(string text)
        {
            var parsed = FromText(text);
            this.frame = parsed.frame;
            this.roll = parsed.roll;
            this.remaining = parsed.remaining;
        }

        public InputControlValuesTyped ToInputControlValuesTyped()
        {
            return new InputControlValuesTyped(
                int.Parse(this.frame),
                new Pins(this.roll),
                new Pins(this.remaining)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(frame) + " " + Tokens.Token(roll) + " " + Tokens.Token(remaining);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not InputControlValuesString other) return false;
            return (DNCString == this.frame || DNCString == other.frame || object.Equals(this.frame, other.frame))
                && (DNCString == this.roll || DNCString == other.roll || object.Equals(this.roll, other.roll))
                && (DNCString == this.remaining || DNCString == other.remaining || object.Equals(this.remaining, other.remaining));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.frame);
            h.Add(this.roll);
            h.Add(this.remaining);
            return h.ToHashCode();
        }
    }
}
