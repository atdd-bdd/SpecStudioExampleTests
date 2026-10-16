namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ShoppingCartString
    {
        public string items;
        public DollarString shipping;
        public DollarString discount;
        public DollarString totalPrice;
        public AddressString shippingAddress;
        public AddressString billingAddress;

        public ShoppingCartString(string items, DollarString shipping, DollarString discount, DollarString totalPrice, AddressString shippingAddress, AddressString billingAddress)
        {
            this.items = items;
            this.shipping = shipping;
            this.discount = discount;
            this.totalPrice = totalPrice;
            this.shippingAddress = shippingAddress;
            this.billingAddress = billingAddress;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ShoppingCartString FromText(string text)
        {
            var parts = Tokens.Require(text, 6, "ShoppingCart");
            return new ShoppingCartString(parts[0], parts[1], parts[2], parts[3], AddressString.FromText(parts[4]), AddressString.FromText(parts[5]));
        }

        public ShoppingCartString(string text)
        {
            var parsed = FromText(text);
            this.items = parsed.items;
            this.shipping = parsed.shipping;
            this.discount = parsed.discount;
            this.totalPrice = parsed.totalPrice;
            this.shippingAddress = parsed.shippingAddress;
            this.billingAddress = parsed.billingAddress;
        }

        public ShoppingCartTyped ToShoppingCartTyped()
        {
            return new ShoppingCartTyped(
                new List<OrderItemTyped>(),
                new DollarTyped(this.shipping),
                new DollarTyped(this.discount),
                new DollarTyped(this.totalPrice),
                this.shippingAddress.ToAddressTyped(),
                this.billingAddress.ToAddressTyped()
            );
        }

        public override string ToString()
        {
            return Tokens.Token(items) + " " + Tokens.Token(shipping) + " " + Tokens.Token(discount) + " " + Tokens.Token(totalPrice) + " " + Tokens.Nested(shippingAddress == null ? "" : shippingAddress.ToString()) + " " + Tokens.Nested(billingAddress == null ? "" : billingAddress.ToString());
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ShoppingCartString other) return false;
            return (DNCString == this.items || DNCString == other.items || object.Equals(this.items, other.items))
                && (DNCString == this.shipping.Value || DNCString == other.shipping.Value || this.shipping.Value == other.shipping.Value)
                && (DNCString == this.discount.Value || DNCString == other.discount.Value || this.discount.Value == other.discount.Value)
                && (DNCString == this.totalPrice.Value || DNCString == other.totalPrice.Value || this.totalPrice.Value == other.totalPrice.Value)
                && object.Equals(this.shippingAddress, other.shippingAddress)
                && object.Equals(this.billingAddress, other.billingAddress);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.items);
            h.Add(this.shipping);
            h.Add(this.discount);
            h.Add(this.totalPrice);
            h.Add(this.shippingAddress);
            h.Add(this.billingAddress);
            return h.ToHashCode();
        }
    }
}
