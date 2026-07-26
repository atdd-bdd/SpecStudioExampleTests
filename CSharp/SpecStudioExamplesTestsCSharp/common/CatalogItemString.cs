namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class CatalogItemString
    {
        public string name;
        public string price;

        public CatalogItemString(string name, string price)
        {
            this.name = name;
            this.price = price;
        }

        public CatalogItemTyped ToCatalogItemTyped()
        {
            return new CatalogItemTyped(
                new SimpleText(this.name),
                new Dollar(this.price)
            );
        }

        public override string ToString()
        {
            return $"Name={name}, Price={price}";
        }
    }
}
