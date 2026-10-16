namespace SpecStudioExamplesTestsCSharp.common
{
using System.Collections.Generic;
using production;

    /// <summary>IDForm as the glue uses it: the text read into the declared type.</summary>
    public class IDFormTyped
    {
        const string DNCString = "?DNC?";

        /// <summary>The cell as written. ?DNC? and an empty cell are kept as they came.</summary>
        public readonly string Text;
        private readonly IDForm? value;   // null for an empty cell or ?DNC?

        public IDFormTyped(IDFormString s)
        {
            this.Text  = s.Value;
            this.value = (this.Text.Length == 0 || this.Text == DNCString) ? (IDForm?)null
                       : new IDForm(this.Text);
        }

        public IDFormTyped(IDForm? value)
        {
            this.value = value;
            this.Text  = value?.ToString() ?? "";
        }

        public bool HasValue => this.value is not null;

        /// <summary>The declared value. An empty cell and ?DNC? have none.</summary>
        public IDForm Get() => this.value!;

        public IDFormString ToIDFormString() => new IDFormString(this.Text);

        public static List<IDFormTyped> FromStringList(List<IDFormString> list)
        {
            var result = new List<IDFormTyped>();
            foreach (var s in list) result.Add(new IDFormTyped(s));
            return result;
        }

        public static List<IDFormString> ToStringList(List<IDFormTyped> list)
        {
            var result = new List<IDFormString>();
            foreach (var t in list) result.Add(t.ToIDFormString());
            return result;
        }

        public override string ToString() => this.Text;

        public override bool Equals(object? obj)
        {
            if (obj is not IDFormTyped other) return false;
            return DNCString == this.Text || DNCString == other.Text
                || this.Text == other.Text;
        }

        public override int GetHashCode() => this.Text.GetHashCode();
    }
}
