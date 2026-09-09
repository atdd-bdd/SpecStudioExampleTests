namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ItemPriceInputString
    {
        public string totalItems;

        public ItemPriceInputString(string totalItems)
        {
            this.totalItems = totalItems;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ItemPriceInputString FromText(string text)
        {
            var parts = Tokens.Require(text, 1, "ItemPriceInput");
            return new ItemPriceInputString(parts[0]);
        }

        public ItemPriceInputTyped ToItemPriceInputTyped()
        {
            return new ItemPriceInputTyped(
                new Dollar(this.totalItems)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(totalItems);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ItemPriceInputString other) return false;
            return (DNCString == this.totalItems || DNCString == other.totalItems || object.Equals(this.totalItems, other.totalItems));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalItems);
            return h.ToHashCode();
        }
    }
}
