namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ShippingString
    {
        public string totalPrice;
        public string shippingCost;
        public string notes;

        public ShippingString(string totalPrice, string shippingCost, string notes)
        {
            this.totalPrice = totalPrice;
            this.shippingCost = shippingCost;
            this.notes = notes;
        }

        public ShippingTyped ToShippingTyped()
        {
            return new ShippingTyped(
                new Dollar(this.totalPrice),
                new Dollar(this.shippingCost),
                this.notes
            );
        }

        public override string ToString()
        {
            return $"Total Price={totalPrice}, Shipping Cost={shippingCost}, Notes={notes}";
        }
    }
}
