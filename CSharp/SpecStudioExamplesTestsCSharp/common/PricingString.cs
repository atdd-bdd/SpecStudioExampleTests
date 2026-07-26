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
    }
}
