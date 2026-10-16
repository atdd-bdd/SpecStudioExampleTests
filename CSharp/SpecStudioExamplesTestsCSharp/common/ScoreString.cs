namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    /// <summary>Score as a table cell holds it: the unconverted text.</summary>
    public readonly struct ScoreString
    {
        private readonly string? text;

        public ScoreString(string? text) { this.text = text; }

        public string Value => this.text ?? "";

        public static implicit operator ScoreString(string? text) => new ScoreString(text);
        public static implicit operator string(ScoreString cell) => cell.Value;

        public static ScoreString FromText(string text) => new ScoreString(text);

        public override string ToString() => this.Value;

        public override bool Equals(object? obj) => obj is ScoreString other && this.Value == other.Value;

        public override int GetHashCode() => this.Value.GetHashCode();
    }
}
