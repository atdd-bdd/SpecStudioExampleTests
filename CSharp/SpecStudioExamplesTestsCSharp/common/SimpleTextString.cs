namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    /// <summary>SimpleText as a table cell holds it: the unconverted text.</summary>
    public readonly struct SimpleTextString
    {
        private readonly string? text;

        public SimpleTextString(string? text) { this.text = text; }

        public string Value => this.text ?? "";

        public static implicit operator SimpleTextString(string? text) => new SimpleTextString(text);
        public static implicit operator string(SimpleTextString cell) => cell.Value;

        public static SimpleTextString FromText(string text) => new SimpleTextString(text);

        public override string ToString() => this.Value;

        public override bool Equals(object? obj) => obj is SimpleTextString other && this.Value == other.Value;

        public override int GetHashCode() => this.Value.GetHashCode();
    }
}
