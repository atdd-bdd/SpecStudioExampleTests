namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class InputControlValuesString
    {
        public string frame;
        public PinsString roll;
        public PinsString remaining;

        public InputControlValuesString(string frame, PinsString roll, PinsString remaining)
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
                new PinsTyped(this.roll),
                new PinsTyped(this.remaining)
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
                && (DNCString == this.roll.Value || DNCString == other.roll.Value || this.roll.Value == other.roll.Value)
                && (DNCString == this.remaining.Value || DNCString == other.remaining.Value || this.remaining.Value == other.remaining.Value);
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
