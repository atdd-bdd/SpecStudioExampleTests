namespace SpecStudioExamplesTestsCSharp.common
{
using System.Collections.Generic;
using production;

    /// <summary>Score as the glue uses it: the text read into the declared type.</summary>
    public class ScoreTyped
    {
        const string DNCString = "?DNC?";

        /// <summary>The cell as written. ?DNC? and an empty cell are kept as they came.</summary>
        public readonly string Text;
        private readonly Score? value;   // null for an empty cell or ?DNC?

        public ScoreTyped(ScoreString s)
        {
            this.Text  = s.Value;
            this.value = (this.Text.Length == 0 || this.Text == DNCString) ? (Score?)null
                       : new Score(this.Text);
        }

        public ScoreTyped(Score? value)
        {
            this.value = value;
            this.Text  = value?.ToString() ?? "";
        }

        public bool HasValue => this.value is not null;

        /// <summary>The declared value. An empty cell and ?DNC? have none.</summary>
        public Score Get() => this.value!;

        public ScoreString ToScoreString() => new ScoreString(this.Text);

        public static List<ScoreTyped> FromStringList(List<ScoreString> list)
        {
            var result = new List<ScoreTyped>();
            foreach (var s in list) result.Add(new ScoreTyped(s));
            return result;
        }

        public static List<ScoreString> ToStringList(List<ScoreTyped> list)
        {
            var result = new List<ScoreString>();
            foreach (var t in list) result.Add(t.ToScoreString());
            return result;
        }

        public override string ToString() => this.Text;

        public override bool Equals(object? obj)
        {
            if (obj is not ScoreTyped other) return false;
            return DNCString == this.Text || DNCString == other.Text
                || this.Text == other.Text;
        }

        public override int GetHashCode() => this.Text.GetHashCode();
    }
}
