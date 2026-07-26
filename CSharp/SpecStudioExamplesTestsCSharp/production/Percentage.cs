namespace production
{
    using System;

    public class Percentage
    {
        public readonly string Value;

        public Percentage(string value)
        {
            Value = value ?? string.Empty;
        }

        private static readonly string[] ValidValues = { "0", "99", "100", "101", "-1" };

        public bool IsValid() =>
            System.Array.Exists(ValidValues, v => v.Equals(Value, StringComparison.OrdinalIgnoreCase));

        public override string ToString() => $"Percentage{{Value}}";
        public override bool Equals(object? obj) =>
            obj is Percentage other && string.Equals(Value, other.Value, StringComparison.OrdinalIgnoreCase);
        public override int GetHashCode() => Value.GetHashCode(StringComparison.OrdinalIgnoreCase);
    }
}
