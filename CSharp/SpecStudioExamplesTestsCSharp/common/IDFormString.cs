namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    /// <summary>IDForm as a table cell holds it: the unconverted text.</summary>
    public readonly struct IDFormString
    {
        private readonly string? text;

        public IDFormString(string? text) { this.text = text; }

        public string Value => this.text ?? "";

        public static implicit operator IDFormString(string? text) => new IDFormString(text);
        public static implicit operator string(IDFormString cell) => cell.Value;

        public static IDFormString FromText(string text) => new IDFormString(text);

        public override string ToString() => this.Value;

        public override bool Equals(object? obj) => obj is IDFormString other && this.Value == other.Value;

        public override int GetHashCode() => this.Value.GetHashCode();
    }
}
