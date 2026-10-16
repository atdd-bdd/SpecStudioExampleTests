namespace SpecStudioExamplesTestsCSharp.common
{
using System.Collections.Generic;
using production;

    /// <summary>Pins as the glue uses it: the text read into the declared type.</summary>
    public class PinsTyped
    {
        const string DNCString = "?DNC?";

        /// <summary>The cell as written. ?DNC? and an empty cell are kept as they came.</summary>
        public readonly string Text;
        private readonly Pins? value;   // null for an empty cell or ?DNC?

        public PinsTyped(PinsString s)
        {
            this.Text  = s.Value;
            this.value = (this.Text.Length == 0 || this.Text == DNCString) ? (Pins?)null
                       : new Pins(this.Text);
        }

        public PinsTyped(Pins? value)
        {
            this.value = value;
            this.Text  = value?.ToString() ?? "";
        }

        public bool HasValue => this.value is not null;

        /// <summary>The declared value. An empty cell and ?DNC? have none.</summary>
        public Pins Get() => this.value!;

        public PinsString ToPinsString() => new PinsString(this.Text);

        public static List<PinsTyped> FromStringList(List<PinsString> list)
        {
            var result = new List<PinsTyped>();
            foreach (var s in list) result.Add(new PinsTyped(s));
            return result;
        }

        public static List<PinsString> ToStringList(List<PinsTyped> list)
        {
            var result = new List<PinsString>();
            foreach (var t in list) result.Add(t.ToPinsString());
            return result;
        }

        public override string ToString() => this.Text;

        public override bool Equals(object? obj)
        {
            if (obj is not PinsTyped other) return false;
            return DNCString == this.Text || DNCString == other.Text
                || this.Text == other.Text;
        }

        public override int GetHashCode() => this.Text.GetHashCode();
    }
}
