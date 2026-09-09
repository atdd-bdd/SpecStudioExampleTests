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

        /// <summary>Builds from the text form, e.g. Money as "25 USD".</summary>
        public static ShippingInputString FromText(string text)
        {
            var parts = Tokens.Require(text, 3, "ShippingInput");
            return new ShippingInputString(parts[0], parts[1], parts[2]);
        }

        public ShippingInputString(string text)
        {
            var parsed = FromText(text);
            this.totalPrice = parsed.totalPrice;
            this.shippingCost = parsed.shippingCost;
            this.notes = parsed.notes;
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
            return Tokens.Token(totalPrice) + " " + Tokens.Token(shippingCost) + " " + Tokens.Token(notes);
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
