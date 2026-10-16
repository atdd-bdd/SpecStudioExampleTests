namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class CartInputString
    {
        public DollarString totalItems;
        public DollarString shipping;
        public DollarString discount;
        public DollarString totalPrice;
        public string notes;

        public CartInputString(DollarString totalItems, DollarString shipping, DollarString discount, DollarString totalPrice, string notes)
        {
            this.totalItems = totalItems;
            this.shipping = shipping;
            this.discount = discount;
            this.totalPrice = totalPrice;
            this.notes = notes;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static CartInputString FromText(string text)
        {
            var parts = Tokens.Require(text, 5, "CartInput");
            return new CartInputString(parts[0], parts[1], parts[2], parts[3], parts[4]);
        }

        public CartInputString(string text)
        {
            var parsed = FromText(text);
            this.totalItems = parsed.totalItems;
            this.shipping = parsed.shipping;
            this.discount = parsed.discount;
            this.totalPrice = parsed.totalPrice;
            this.notes = parsed.notes;
        }

        public CartInputTyped ToCartInputTyped()
        {
            return new CartInputTyped(
                new DollarTyped(this.totalItems),
                new DollarTyped(this.shipping),
                new DollarTyped(this.discount),
                new DollarTyped(this.totalPrice),
                this.notes
            );
        }

        public override string ToString()
        {
            return Tokens.Token(totalItems) + " " + Tokens.Token(shipping) + " " + Tokens.Token(discount) + " " + Tokens.Token(totalPrice) + " " + Tokens.Token(notes);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not CartInputString other) return false;
            return (DNCString == this.totalItems.Value || DNCString == other.totalItems.Value || this.totalItems.Value == other.totalItems.Value)
                && (DNCString == this.shipping.Value || DNCString == other.shipping.Value || this.shipping.Value == other.shipping.Value)
                && (DNCString == this.discount.Value || DNCString == other.discount.Value || this.discount.Value == other.discount.Value)
                && (DNCString == this.totalPrice.Value || DNCString == other.totalPrice.Value || this.totalPrice.Value == other.totalPrice.Value)
                && (DNCString == this.notes || DNCString == other.notes || object.Equals(this.notes, other.notes));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalItems);
            h.Add(this.shipping);
            h.Add(this.discount);
            h.Add(this.totalPrice);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
