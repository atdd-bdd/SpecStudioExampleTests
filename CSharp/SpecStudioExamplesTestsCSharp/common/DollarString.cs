namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    /// <summary>Dollar as a table cell holds it: the unconverted text.</summary>
    public readonly struct DollarString
    {
        private readonly string? text;

        public DollarString(string? text) { this.text = text; }

        public string Value => this.text ?? "";

        public static implicit operator DollarString(string? text) => new DollarString(text);
        public static implicit operator string(DollarString cell) => cell.Value;

        public static DollarString FromText(string text) => new DollarString(text);

        public override string ToString() => this.Value;

        public override bool Equals(object? obj) => obj is DollarString other && this.Value == other.Value;

        public override int GetHashCode() => this.Value.GetHashCode();
    }
}
