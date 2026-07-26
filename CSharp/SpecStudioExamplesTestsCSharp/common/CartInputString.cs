namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class CartInputString
    {
        public string totalItems;
        public string shipping;
        public string discount;
        public string totalPrice;
        public string notes;

        public CartInputString(string totalItems, string shipping, string discount, string totalPrice, string notes)
        {
            this.totalItems = totalItems;
            this.shipping = shipping;
            this.discount = discount;
            this.totalPrice = totalPrice;
            this.notes = notes;
        }

        public CartInputTyped ToCartInputTyped()
        {
            return new CartInputTyped(
                new Dollar(this.totalItems),
                new Dollar(this.shipping),
                new Dollar(this.discount),
                new Dollar(this.totalPrice),
                this.notes
            );
        }

        public override string ToString()
        {
            return $"TotalItems={totalItems}, Shipping={shipping}, Discount={discount}, Total Price={totalPrice}, Notes={notes}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not CartInputString other) return false;
            return (DNCString == this.totalItems || DNCString == other.totalItems || object.Equals(this.totalItems, other.totalItems))
                && (DNCString == this.shipping || DNCString == other.shipping || object.Equals(this.shipping, other.shipping))
                && (DNCString == this.discount || DNCString == other.discount || object.Equals(this.discount, other.discount))
                && (DNCString == this.totalPrice || DNCString == other.totalPrice || object.Equals(this.totalPrice, other.totalPrice))
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
