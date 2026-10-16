namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    /// <summary>Percentage as a table cell holds it: the unconverted text.</summary>
    public readonly struct PercentageString
    {
        private readonly string? text;

        public PercentageString(string? text) { this.text = text; }

        public string Value => this.text ?? "";

        public static implicit operator PercentageString(string? text) => new PercentageString(text);
        public static implicit operator string(PercentageString cell) => cell.Value;

        public static PercentageString FromText(string text) => new PercentageString(text);

        public override string ToString() => this.Value;

        public override bool Equals(object? obj) => obj is PercentageString other && this.Value == other.Value;

        public override int GetHashCode() => this.Value.GetHashCode();
    }
}
