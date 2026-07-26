namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ShippingInputString
    {
        public string totalPrice;
        public string shippingCost;
        public string notes;

        public ShippingInputString(string totalPrice, string shippingCost, string notes)
        {
            this.totalPrice = totalPrice;
            this.shippingCost = shippingCost;
            this.notes = notes;
        }

        public ShippingInputTyped ToShippingInputTyped()
        {
            return new ShippingInputTyped(
                new Dollar(this.totalPrice),
                new Dollar(this.shippingCost),
                this.notes
            );
        }

        public override string ToString()
        {
            return $"Total Price={totalPrice}, Shipping Cost={shippingCost}, Notes={notes}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ShippingInputString other) return false;
            return (DNCString == this.totalPrice || DNCString == other.totalPrice || object.Equals(this.totalPrice, other.totalPrice))
                && (DNCString == this.shippingCost || DNCString == other.shippingCost || object.Equals(this.shippingCost, other.shippingCost))
                && (DNCString == this.notes || DNCString == other.notes || object.Equals(this.notes, other.notes));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalPrice);
            h.Add(this.shippingCost);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
