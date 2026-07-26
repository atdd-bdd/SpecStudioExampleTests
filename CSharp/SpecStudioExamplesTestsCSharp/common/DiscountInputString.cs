namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class DiscountInputString
    {
        public string totalPrice;
        public string discount;
        public string notes;

        public DiscountInputString(string totalPrice, string discount, string notes)
        {
            this.totalPrice = totalPrice;
            this.discount = discount;
            this.notes = notes;
        }

        public DiscountInputTyped ToDiscountInputTyped()
        {
            return new DiscountInputTyped(
                new Dollar(this.totalPrice),
                new Percentage(this.discount),
                this.notes
            );
        }

        public override string ToString()
        {
            return $"Total Price={totalPrice}, Discount={discount}, Notes={notes}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not DiscountInputString other) return false;
            return (DNCString == this.totalPrice || DNCString == other.totalPrice || object.Equals(this.totalPrice, other.totalPrice))
                && (DNCString == this.discount || DNCString == other.discount || object.Equals(this.discount, other.discount))
                && (DNCString == this.notes || DNCString == other.notes || object.Equals(this.notes, other.notes));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalPrice);
            h.Add(this.discount);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
