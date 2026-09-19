namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class PostString
    {
        public string userId;
        public string id;
        public string title;
        public string body;

        public PostString(string userId, string id, string title, string body)
        {
            this.userId = userId;
            this.id = id;
            this.title = title;
            this.body = body;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static PostString FromText(string text)
        {
            var parts = Tokens.Require(text, 4, "Post");
            return new PostString(parts[0], parts[1], parts[2], parts[3]);
        }

        public PostString(string text)
        {
            var parsed = FromText(text);
            this.userId = parsed.userId;
            this.id = parsed.id;
            this.title = parsed.title;
            this.body = parsed.body;
        }

        public PostTyped ToPostTyped()
        {
            return new PostTyped(
                int.Parse(this.userId),
                int.Parse(this.id),
                this.title,
                this.body
            );
        }

        public override string ToString()
        {
            return Tokens.Token(userId) + " " + Tokens.Token(id) + " " + Tokens.Token(title) + " " + Tokens.Token(body);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not PostString other) return false;
            return (DNCString == this.userId || DNCString == other.userId || object.Equals(this.userId, other.userId))
                && (DNCString == this.id || DNCString == other.id || object.Equals(this.id, other.id))
                && (DNCString == this.title || DNCString == other.title || object.Equals(this.title, other.title))
                && (DNCString == this.body || DNCString == other.body || object.Equals(this.body, other.body));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.userId);
            h.Add(this.id);
            h.Add(this.title);
            h.Add(this.body);
            return h.ToHashCode();
        }
    }
}
