namespace production
{
    using System;
    using System.Globalization;

    /// <summary>
    /// The number of pins knocked down by one roll, or -1 (TBR) when the roll has not
    /// happened yet.
    ///
    /// The spec's ValidValues table is the contract: 0 and 10 are valid, 11 and
    /// -2 are not, and -1 -- the spec's =TBR -- is valid because a scoresheet shows rolls
    /// that are still to come. The constructor refuses exactly the invalid ones,
    /// so a number out of range fails the same way an unparseable one does.
    /// </summary>
    public class Pins
    {
        /// <summary>Marker for a roll that has not been made: the integer the spec defines TBR as.</summary>
        public const int TBRValue = -1;

        public const int Max = 10;

        public static readonly Pins TBR = new Pins(TBRValue);

        public readonly int Value;

        /// <summary>From the text form, which is what a table cell holds.</summary>
        public Pins(string text)
            // Parse throws FormatException on anything non-numeric.
            : this(int.Parse((text ?? string.Empty).Trim(), CultureInfo.InvariantCulture)) {}

        public Pins(int count)
        {
            if (count != TBRValue && (count < 0 || count > Max))
                throw new FormatException($"Roll must be between 0 and {Max}, got {count}");
            Value = count;
        }

        /// <summary>False when this is TBR -- the roll has not been made.</summary>
        public bool IsRolled() => Value != TBRValue;

        /// <summary>Pin count, or -1 when the roll has not been made.</summary>
        public int Count() => Value;

        public bool IsStrike() => IsRolled() && Value == Max;

        public override bool Equals(object obj) => obj is Pins other && Value == other.Value;

        public override int GetHashCode() => Value.GetHashCode();

        /// <summary>The text form: what a table cell holds.</summary>
        public override string ToString() => Value.ToString(CultureInfo.InvariantCulture);
    }
}
