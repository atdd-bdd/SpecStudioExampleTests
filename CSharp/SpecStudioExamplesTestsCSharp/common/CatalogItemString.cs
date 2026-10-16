namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class CatalogItemString
    {
        public SimpleTextString name;
        public DollarString price;

        public CatalogItemString(SimpleTextString name, DollarString price)
        {
            this.name = name;
            this.price = price;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static CatalogItemString FromText(string text)
        {
            var parts = Tokens.Require(text, 2, "CatalogItem");
            return new CatalogItemString(parts[0], parts[1]);
        }

        public CatalogItemString(string text)
        {
            var parsed = FromText(text);
            this.name = parsed.name;
            this.price = parsed.price;
        }

        public CatalogItemTyped ToCatalogItemTyped()
        {
            return new CatalogItemTyped(
                new SimpleTextTyped(this.name),
                new DollarTyped(this.price)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(name) + " " + Tokens.Token(price);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not CatalogItemString other) return false;
            return (DNCString == this.name.Value || DNCString == other.name.Value || this.name.Value == other.name.Value)
                && (DNCString == this.price.Value || DNCString == other.price.Value || this.price.Value == other.price.Value);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.name);
            h.Add(this.price);
            return h.ToHashCode();
        }
    }
}
