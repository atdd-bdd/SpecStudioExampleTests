namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class DiscountInputString
    {
        public DollarString totalPrice;
        public PercentageString discount;
        public string notes;

        public DiscountInputString(DollarString totalPrice, PercentageString discount, string notes)
        {
            this.totalPrice = totalPrice;
            this.discount = discount;
            this.notes = notes;
        }

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static DiscountInputString FromText(string text)
        {
            var parts = Tokens.Require(text, 3, "DiscountInput");
            return new DiscountInputString(parts[0], parts[1], parts[2]);
        }

        public DiscountInputString(string text)
        {
            var parsed = FromText(text);
            this.totalPrice = parsed.totalPrice;
            this.discount = parsed.discount;
            this.notes = parsed.notes;
        }

        public DiscountInputTyped ToDiscountInputTyped()
        {
            return new DiscountInputTyped(
                new DollarTyped(this.totalPrice),
                new PercentageTyped(this.discount),
                this.notes
            );
        }

        public override string ToString()
        {
            return Tokens.Token(totalPrice) + " " + Tokens.Token(discount) + " " + Tokens.Token(notes);
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not DiscountInputString other) return false;
            return (DNCString == this.totalPrice.Value || DNCString == other.totalPrice.Value || this.totalPrice.Value == other.totalPrice.Value)
                && (DNCString == this.discount.Value || DNCString == other.discount.Value || this.discount.Value == other.discount.Value)
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
