namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class NewPostString
    {
        public string title;
        public string body;
        public string userId;

        public NewPostString(string title, string body, string userId)
        {
            this.title = title;
            this.body = body;
            this.userId = userId;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static NewPostString FromText(string text)
        {
            var parts = Tokens.Require(text, 3, "NewPost");
            return new NewPostString(parts[0], parts[1], parts[2]);
        }

        public NewPostString(string text)
        {
            var parsed = FromText(text);
            this.title = parsed.title;
            this.body = parsed.body;
            this.userId = parsed.userId;
        }

        public NewPostTyped ToNewPostTyped()
        {
            return new NewPostTyped(
                this.title,
                this.body,
                int.Parse(this.userId)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(title) + " " + Tokens.Token(body) + " " + Tokens.Token(userId);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not NewPostString other) return false;
            return (DNCString == this.title || DNCString == other.title || object.Equals(this.title, other.title))
                && (DNCString == this.body || DNCString == other.body || object.Equals(this.body, other.body))
                && (DNCString == this.userId || DNCString == other.userId || object.Equals(this.userId, other.userId));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.title);
            h.Add(this.body);
            h.Add(this.userId);
            return h.ToHashCode();
        }
    }
}
