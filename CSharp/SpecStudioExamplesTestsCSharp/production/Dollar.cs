namespace production
{
    using System;

    public class Dollar
    {
        public readonly string Value;

        public Dollar(string value)
        {
            Value = value ?? string.Empty;
        }

        private static readonly string[] ValidValues = { "0", "0.01", "-1", "0.001" };

        public bool IsValid() =>
            System.Array.Exists(ValidValues, v => v.Equals(Value, StringComparison.OrdinalIgnoreCase));

        public override string ToString() => $"Dollar{{Value}}";
        public override bool Equals(object? obj) =>
            obj is Dollar other && string.Equals(Value, other.Value, StringComparison.OrdinalIgnoreCase);
        public override int GetHashCode() => Value.GetHashCode(StringComparison.OrdinalIgnoreCase);
    }
}
