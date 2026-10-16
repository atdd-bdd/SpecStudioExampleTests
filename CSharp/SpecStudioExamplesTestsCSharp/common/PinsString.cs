namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    /// <summary>Pins as a table cell holds it: the unconverted text.</summary>
    public readonly struct PinsString
    {
        private readonly string? text;

        public PinsString(string? text) { this.text = text; }

        public string Value => this.text ?? "";

        public static implicit operator PinsString(string? text) => new PinsString(text);
        public static implicit operator string(PinsString cell) => cell.Value;

        public static PinsString FromText(string text) => new PinsString(text);

        public override string ToString() => this.Value;

        public override bool Equals(object? obj) => obj is PinsString other && this.Value == other.Value;

        public override int GetHashCode() => this.Value.GetHashCode();
    }
}
