namespace SpecStudioExamplesTestsCSharp.common
{
using System.Collections.Generic;
using production;

    /// <summary>Dollar as the glue uses it: the text read into the declared type.</summary>
    public class DollarTyped
    {
        const string DNCString = "?DNC?";

        /// <summary>The cell as written. ?DNC? and an empty cell are kept as they came.</summary>
        public readonly string Text;
        private readonly Dollar? value;   // null for an empty cell or ?DNC?

        public DollarTyped(DollarString s)
        {
            this.Text  = s.Value;
            this.value = (this.Text.Length == 0 || this.Text == DNCString) ? (Dollar?)null
                       : new Dollar(this.Text);
        }

        public DollarTyped(Dollar? value)
        {
            this.value = value;
            this.Text  = value?.ToString() ?? "";
        }

        public bool HasValue => this.value is not null;

        /// <summary>The declared value. An empty cell and ?DNC? have none.</summary>
        public Dollar Get() => this.value!;

        public DollarString ToDollarString() => new DollarString(this.Text);

        public static List<DollarTyped> FromStringList(List<DollarString> list)
        {
            var result = new List<DollarTyped>();
            foreach (var s in list) result.Add(new DollarTyped(s));
            return result;
        }

        public static List<DollarString> ToStringList(List<DollarTyped> list)
        {
            var result = new List<DollarString>();
            foreach (var t in list) result.Add(t.ToDollarString());
            return result;
        }

        public override string ToString() => this.Text;

        public override bool Equals(object? obj)
        {
            if (obj is not DollarTyped other) return false;
            return DNCString == this.Text || DNCString == other.Text
                || this.Text == other.Text;
        }

        public override int GetHashCode() => this.Text.GetHashCode();
    }
}
