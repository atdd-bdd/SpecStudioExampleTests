namespace SpecStudioExamplesTestsCSharp.common
{
using System.Collections.Generic;
using production;

    /// <summary>SimpleText as the glue uses it: the text read into the declared type.</summary>
    public class SimpleTextTyped
    {
        const string DNCString = "?DNC?";

        /// <summary>The cell as written. ?DNC? and an empty cell are kept as they came.</summary>
        public readonly string Text;
        private readonly SimpleText? value;   // null for an empty cell or ?DNC?

        public SimpleTextTyped(SimpleTextString s)
        {
            this.Text  = s.Value;
            this.value = (this.Text.Length == 0 || this.Text == DNCString) ? (SimpleText?)null
                       : new SimpleText(this.Text);
        }

        public SimpleTextTyped(SimpleText? value)
        {
            this.value = value;
            this.Text  = value?.ToString() ?? "";
        }

        public bool HasValue => this.value is not null;

        /// <summary>The declared value. An empty cell and ?DNC? have none.</summary>
        public SimpleText Get() => this.value!;

        public SimpleTextString ToSimpleTextString() => new SimpleTextString(this.Text);

        public static List<SimpleTextTyped> FromStringList(List<SimpleTextString> list)
        {
            var result = new List<SimpleTextTyped>();
            foreach (var s in list) result.Add(new SimpleTextTyped(s));
            return result;
        }

        public static List<SimpleTextString> ToStringList(List<SimpleTextTyped> list)
        {
            var result = new List<SimpleTextString>();
            foreach (var t in list) result.Add(t.ToSimpleTextString());
            return result;
        }

        public override string ToString() => this.Text;

        public override bool Equals(object? obj)
        {
            if (obj is not SimpleTextTyped other) return false;
            return DNCString == this.Text || DNCString == other.Text
                || this.Text == other.Text;
        }

        public override int GetHashCode() => this.Text.GetHashCode();
    }
}
