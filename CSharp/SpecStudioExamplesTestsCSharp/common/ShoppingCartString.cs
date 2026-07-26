namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ShoppingCartString
    {
        public string items;
        public string shipping;
        public string discount;
        public string totalPrice;
        public AddressString shippingAddress;
        public AddressString billingAddress;

        public ShoppingCartString(string items, string shipping, string discount, string totalPrice, AddressString shippingAddress, AddressString billingAddress)
        {
            this.items = items;
            this.shipping = shipping;
            this.discount = discount;
            this.totalPrice = totalPrice;
            this.shippingAddress = shippingAddress;
            this.billingAddress = billingAddress;
        }

        public ShoppingCartTyped ToShoppingCartTyped()
        {
            return new ShoppingCartTyped(
                new List<OrderItemTyped>(),
                new Dollar(this.shipping),
                new Dollar(this.discount),
                new Dollar(this.totalPrice),
                this.shippingAddress.ToAddressTyped(),
                this.billingAddress.ToAddressTyped()
            );
        }

        public override string ToString()
        {
            return $"Items={items}, Shipping={shipping}, Discount={discount}, TotalPrice={totalPrice}, ShippingAddress={shippingAddress}, BillingAddress={billingAddress}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ShoppingCartString other) return false;
            return (DNCString == this.items || DNCString == other.items || object.Equals(this.items, other.items))
                && (DNCString == this.shipping || DNCString == other.shipping || object.Equals(this.shipping, other.shipping))
                && (DNCString == this.discount || DNCString == other.discount || object.Equals(this.discount, other.discount))
                && (DNCString == this.totalPrice || DNCString == other.totalPrice || object.Equals(this.totalPrice, other.totalPrice))
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
