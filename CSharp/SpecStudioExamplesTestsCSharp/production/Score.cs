namespace production
{
    using System;
    using System.Globalization;

    /// <summary>
    /// A frame score or running total, or -1 (TBS) while the rolls it depends on have
    /// not all been made.
    ///
    /// The spec's ValidValues table bounds it at 0..300 -- 300 being a perfect
    /// game -- and rejects 301; -1 is valid only because the spec defines TBS as -1:
    /// a frame ending in a strike or a spare cannot be scored until its
    /// bonus rolls exist, and "not yet computable" is a normal state rather than
    /// an error.
    /// </summary>
    public class Score
    {
        /// <summary>Marker for a score that cannot be computed yet: the integer the spec defines TBS as.</summary>
        public const int TBSValue = -1;

        public const int Min = 0;
        public const int Max = 300;

        public static readonly Score TBS = new Score(TBSValue);

        public readonly int Value;

        /// <summary>From the text form, which is what a table cell holds.</summary>
        public Score(string text)
            : this(int.Parse((text ?? string.Empty).Trim(), CultureInfo.InvariantCulture)) {}

        public Score(int points)
        {
            if (points != TBSValue && (points < Min || points > Max))
                throw new FormatException($"Score must be between {Min} and {Max}, got {points}");
            Value = points;
        }

        public bool IsComputable() => Value != TBSValue;

        /// <summary>Points, or -1 when not yet computable.</summary>
        public int Points() => Value;

        public override bool Equals(object obj) => obj is Score other && Value == other.Value;

        public override int GetHashCode() => Value.GetHashCode();

        /// <summary>The text form: what a table cell holds.</summary>
        public override string ToString() => Value.ToString(CultureInfo.InvariantCulture);
    }
}
