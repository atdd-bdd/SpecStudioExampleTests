namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class OrderItemString
    {
        public string name;
        public string quantity;
        public string price;
        public string itemTotal;

        public OrderItemString(string name, string quantity, string price, string itemTotal)
        {
            this.name = name;
            this.quantity = quantity;
            this.price = price;
            this.itemTotal = itemTotal;
        }

        public OrderItemTyped ToOrderItemTyped()
        {
            return new OrderItemTyped(
                new SimpleText(this.name),
                int.Parse(this.quantity),
                new Dollar(this.price),
                new Dollar(this.itemTotal)
            );
        }

        public override string ToString()
        {
            return $"Name={name}, Quantity={quantity}, Price={price}, ItemTotal={itemTotal}";
        }
    }
}
