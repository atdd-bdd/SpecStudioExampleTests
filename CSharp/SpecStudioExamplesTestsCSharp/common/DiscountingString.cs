namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class DiscountingString
    {
        public string totalPrice;
        public string discount;
        public string notes;

        public DiscountingString(string totalPrice, string discount, string notes)
        {
            this.totalPrice = totalPrice;
            this.discount = discount;
            this.notes = notes;
        }

        public DiscountingTyped ToDiscountingTyped()
        {
            return new DiscountingTyped(
                new Dollar(this.totalPrice),
                new Percentage(this.discount),
                this.notes
            );
        }

        public override string ToString()
        {
            return $"Total Price={totalPrice}, Discount={discount}, Notes={notes}";
        }
    }
}
