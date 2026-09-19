namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ReplacePostString
    {
        public string id;
        public string userId;
        public string title;
        public string body;

        public ReplacePostString(string id, string userId, string title, string body)
        {
            this.id = id;
            this.userId = userId;
            this.title = title;
            this.body = body;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ReplacePostString FromText(string text)
        {
            var parts = Tokens.Require(text, 4, "ReplacePost");
            return new ReplacePostString(parts[0], parts[1], parts[2], parts[3]);
        }

        public ReplacePostString(string text)
        {
            var parsed = FromText(text);
            this.id = parsed.id;
            this.userId = parsed.userId;
            this.title = parsed.title;
            this.body = parsed.body;
        }

        public ReplacePostTyped ToReplacePostTyped()
        {
            return new ReplacePostTyped(
                int.Parse(this.id),
                int.Parse(this.userId),
                this.title,
                this.body
            );
        }

        public override string ToString()
        {
            return Tokens.Token(id) + " " + Tokens.Token(userId) + " " + Tokens.Token(title) + " " + Tokens.Token(body);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ReplacePostString other) return false;
            return (DNCString == this.id || DNCString == other.id || object.Equals(this.id, other.id))
                && (DNCString == this.userId || DNCString == other.userId || object.Equals(this.userId, other.userId))
                && (DNCString == this.title || DNCString == other.title || object.Equals(this.title, other.title))
                && (DNCString == this.body || DNCString == other.body || object.Equals(this.body, other.body));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.id);
            h.Add(this.userId);
            h.Add(this.title);
            h.Add(this.body);
            return h.ToHashCode();
        }
    }
}
