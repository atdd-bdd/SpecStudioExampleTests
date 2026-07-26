namespace production
{
    using System;

    public class SimpleText
    {
        public readonly string Value;

        public SimpleText(string value)
        {
            Value = value ?? string.Empty;
        }

        private static readonly string[] ValidValues = { "abc", "ab.", "1234567890", "@", "-a-b" };

        public bool IsValid() =>
            System.Array.Exists(ValidValues, v => v.Equals(Value, StringComparison.OrdinalIgnoreCase));

        public override string ToString() => $"SimpleText{{Value}}";
        public override bool Equals(object? obj) =>
            obj is SimpleText other && string.Equals(Value, other.Value, StringComparison.OrdinalIgnoreCase);
        public override int GetHashCode() => Value.GetHashCode(StringComparison.OrdinalIgnoreCase);
    }
}
