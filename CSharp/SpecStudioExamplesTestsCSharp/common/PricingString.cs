namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class PricingString
    {
        public string totalPrice;

        public PricingString(string totalPrice)
        {
            this.totalPrice = totalPrice;
        }

        public PricingTyped ToPricingTyped()
        {
            return new PricingTyped(
                new Dollar(this.totalPrice)
            );
        }

        public override string ToString()
        {
            return $"TotalPrice={totalPrice}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not PricingString other) return false;
            return (DNCString == this.totalPrice || DNCString == other.totalPrice || object.Equals(this.totalPrice, other.totalPrice));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalPrice);
            return h.ToHashCode();
        }
    }
}
