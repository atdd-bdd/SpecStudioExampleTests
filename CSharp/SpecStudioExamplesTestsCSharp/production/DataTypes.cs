namespace production
{
    using System;
    using System.Globalization;
    using System.Linq;

    /// <summary>A monetary amount: never negative, never finer than a cent.
    /// Held as whole cents so the arithmetic is exact.</summary>
    public class Dollar
    {
        public readonly int Cents;

        public Dollar(int cents) { Cents = cents; }

        /// <summary>Reads "$10.00", "10", "0.01" and the like.</summary>
        public Dollar(string value)
        {
            var text = (value ?? "").Replace("$", "").Trim();
            if (text.Length == 0) { Cents = 0; return; }

            bool negative = text.StartsWith("-");
            var digits = text.TrimStart('-', '+');
            var parts = digits.Split('.');
            if (parts.Length > 2) throw new FormatException($"Not a number: {value}");
            var whole = parts[0];
            var frac = parts.Length > 1 ? parts[1] : "";

            if (whole.Length == 0 && frac.Length == 0)
                throw new FormatException($"Not a number: {value}");
            if (!whole.All(char.IsDigit) || !frac.All(char.IsDigit))
                throw new FormatException($"Not a number: {value}");
            if (frac.Length > 2)
                throw new FormatException(
                    $"Dollar amount must not have more than two decimal digits: {value}");

            int wv = whole.Length == 0 ? 0 : int.Parse(whole, CultureInfo.InvariantCulture);
            int fv = frac.Length switch
            {
                0 => 0,
                1 => int.Parse(frac, CultureInfo.InvariantCulture) * 10,
                _ => int.Parse(frac, CultureInfo.InvariantCulture),
            };
            int total = wv * 100 + fv;
            if (negative && total != 0)
                throw new FormatException($"Dollar amount cannot be negative: {value}");
            Cents = total;
        }

        public Dollar Plus(Dollar other) => new Dollar(Cents + other.Cents);
        public Dollar Minus(Dollar other) => new Dollar(Cents - other.Cents);
        public Dollar Times(int factor) => new Dollar(Cents * factor);

        /// <summary>The given percentage of this amount, rounded half up to a cent.</summary>
        public Dollar PercentOf(Percentage percentage) =>
            new Dollar((Cents * percentage.Value + 50) / 100);

        public override string ToString()
        {
            var sign = Cents < 0 ? "-" : "";
            var c = Math.Abs(Cents);
            return $"{sign}{c / 100}.{c % 100:D2}";
        }

        public override bool Equals(object obj) => obj is Dollar d && d.Cents == Cents;
        public override int GetHashCode() => Cents;
    }

    /// <summary>A percentage from 0 to 100 inclusive.</summary>
    public class Percentage
    {
        public readonly int Value;

        public Percentage(int value) { Value = value; }

        public Percentage(string value)
        {
            var text = (value ?? "").Replace("%", "").Trim();
            if (!int.TryParse(text, NumberStyles.Integer, CultureInfo.InvariantCulture, out Value))
                throw new FormatException($"Not a number: {value}");
            if (Value < 0 || Value > 100)
                throw new FormatException($"Percentage must be between 0 and 100: {value}");
        }

        public override string ToString() => Value.ToString(CultureInfo.InvariantCulture);
        public override bool Equals(object obj) => obj is Percentage p && p.Value == Value;
        public override int GetHashCode() => Value;
    }

    /// <summary>Alphabetic, numeric, space, hyphen, period, comma — nothing else.</summary>
    public class SimpleText
    {
        public readonly string Value;

        public SimpleText(string value)
        {
            Value = value ?? "";
            foreach (var c in Value)
                if (!char.IsLetterOrDigit(c) && c != ' ' && c != ',' && c != '.' && c != '-')
                    throw new FormatException($"Invalid SimpleText: {Value}");
        }

        public override string ToString() => Value;
        public override bool Equals(object obj) =>
            obj is SimpleText s && string.Equals(s.Value, Value, StringComparison.Ordinal);
        public override int GetHashCode() => Value.GetHashCode();
    }

    /// <summary>Exactly five characters, beginning with Q.</summary>
    public class IDForm
    {
        public readonly string Value;

        public IDForm(string value)
        {
            Value = value ?? "";
            if (Value.Length != 5 || !Value.StartsWith("Q"))
                throw new FormatException("Must be 5 characters starting with Q");
        }

        public override string ToString() => Value;
        public override bool Equals(object obj) =>
            obj is IDForm i && string.Equals(i.Value, Value, StringComparison.Ordinal);
        public override int GetHashCode() => Value.GetHashCode();
    }
}
