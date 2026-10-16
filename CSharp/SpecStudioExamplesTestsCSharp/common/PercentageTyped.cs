namespace SpecStudioExamplesTestsCSharp.common
{
using System.Collections.Generic;
using production;

    /// <summary>Percentage as the glue uses it: the text read into the declared type.</summary>
    public class PercentageTyped
    {
        const string DNCString = "?DNC?";

        /// <summary>The cell as written. ?DNC? and an empty cell are kept as they came.</summary>
        public readonly string Text;
        private readonly Percentage? value;   // null for an empty cell or ?DNC?

        public PercentageTyped(PercentageString s)
        {
            this.Text  = s.Value;
            this.value = (this.Text.Length == 0 || this.Text == DNCString) ? (Percentage?)null
                       : new Percentage(this.Text);
        }

        public PercentageTyped(Percentage? value)
        {
            this.value = value;
            this.Text  = value?.ToString() ?? "";
        }

        public bool HasValue => this.value is not null;

        /// <summary>The declared value. An empty cell and ?DNC? have none.</summary>
        public Percentage Get() => this.value!;

        public PercentageString ToPercentageString() => new PercentageString(this.Text);

        public static List<PercentageTyped> FromStringList(List<PercentageString> list)
        {
            var result = new List<PercentageTyped>();
            foreach (var s in list) result.Add(new PercentageTyped(s));
            return result;
        }

        public static List<PercentageString> ToStringList(List<PercentageTyped> list)
        {
            var result = new List<PercentageString>();
            foreach (var t in list) result.Add(t.ToPercentageString());
            return result;
        }

        public override string ToString() => this.Text;

        public override bool Equals(object? obj)
        {
            if (obj is not PercentageTyped other) return false;
            return DNCString == this.Text || DNCString == other.Text
                || this.Text == other.Text;
        }

        public override int GetHashCode() => this.Text.GetHashCode();
    }
}
