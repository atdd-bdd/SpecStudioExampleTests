namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class PatchTitleString
    {
        public string title;

        public PatchTitleString(string title)
        {
            this.title = title;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static PatchTitleString FromText(string text)
        {
            var parts = Tokens.Require(text, 1, "PatchTitle");
            return new PatchTitleString(parts[0]);
        }

        public PatchTitleTyped ToPatchTitleTyped()
        {
            return new PatchTitleTyped(
                this.title
            );
        }

        public override string ToString()
        {
            return Tokens.Token(title);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not PatchTitleString other) return false;
            return (DNCString == this.title || DNCString == other.title || object.Equals(this.title, other.title));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.title);
            return h.ToHashCode();
        }
    }
}
