namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class OrderItemString
    {
        public string name;
        public string quantity;
        public string price;
        public string itemTotal;

        public OrderItemString(string name, string quantity, string price, string itemTotal)
        {
            this.name = name;
            this.quantity = quantity;
            this.price = price;
            this.itemTotal = itemTotal;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static OrderItemString FromText(string text)
        {
            var parts = Tokens.Require(text, 4, "OrderItem");
            return new OrderItemString(parts[0], parts[1], parts[2], parts[3]);
        }

        public OrderItemString(string text)
        {
            var parsed = FromText(text);
            this.name = parsed.name;
            this.quantity = parsed.quantity;
            this.price = parsed.price;
            this.itemTotal = parsed.itemTotal;
        }

        public OrderItemTyped ToOrderItemTyped()
        {
            return new OrderItemTyped(
                new SimpleText(this.name),
                int.Parse(this.quantity),
                new Dollar(this.price),
                new Dollar(this.itemTotal)
            );
        }

        public override string ToString()
        {
            return Tokens.Token(name) + " " + Tokens.Token(quantity) + " " + Tokens.Token(price) + " " + Tokens.Token(itemTotal);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not OrderItemString other) return false;
            return (DNCString == this.name || DNCString == other.name || object.Equals(this.name, other.name))
                && (DNCString == this.quantity || DNCString == other.quantity || object.Equals(this.quantity, other.quantity))
                && (DNCString == this.price || DNCString == other.price || object.Equals(this.price, other.price))
                && (DNCString == this.itemTotal || DNCString == other.itemTotal || object.Equals(this.itemTotal, other.itemTotal));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.name);
            h.Add(this.quantity);
            h.Add(this.price);
            h.Add(this.itemTotal);
            return h.ToHashCode();
        }
    }
}
