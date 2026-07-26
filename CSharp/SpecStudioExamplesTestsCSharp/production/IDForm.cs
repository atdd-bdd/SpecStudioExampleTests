namespace production
{
    using System;

    public class IDForm
    {
        public readonly string Value;

        public IDForm(string value)
        {
            Value = value ?? string.Empty;
        }

        private static readonly string[] ValidValues = { "Q1234", "Q123", "Q12345", "A1234" };

        public bool IsValid() =>
            System.Array.Exists(ValidValues, v => v.Equals(Value, StringComparison.OrdinalIgnoreCase));

        public override string ToString() => $"IDForm{{Value}}";
        public override bool Equals(object? obj) =>
            obj is IDForm other && string.Equals(Value, other.Value, StringComparison.OrdinalIgnoreCase);
        public override int GetHashCode() => Value.GetHashCode(StringComparison.OrdinalIgnoreCase);
    }
}
