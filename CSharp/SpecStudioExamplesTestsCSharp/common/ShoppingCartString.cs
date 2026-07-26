namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ShoppingCartString
    {
        public string items;
        public string shipping;
        public string discount;
        public string totalPrice;
        public string shippingAddress;
        public string billingAddress;

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
                new OrderItemCollection(this.items),
                new Dollar(this.shipping),
                new Dollar(this.discount),
                new Dollar(this.totalPrice),
                new Address(this.shippingAddress),
                new Address(this.billingAddress)
            );
        }

        public override string ToString()
        {
            return $"Items={items}, Shipping={shipping}, Discount={discount}, TotalPrice={totalPrice}, ShippingAddress={shippingAddress}, BillingAddress={billingAddress}";
        }
    }
}
