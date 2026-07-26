namespace production
{
    using System.Collections.Generic;
    using System.Linq;

    // The entities and collections the Shopping Cart and Record Filter
    // specifications describe.

    // -----------------------------------------------------------------------
    // Records
    // -----------------------------------------------------------------------

    public class IDValue
    {
        public readonly IDForm ID;
        public readonly int Value;

        public IDValue(IDForm id, int value) { ID = id; Value = value; }
    }

    /// <summary>Holds IDValue records and sums the ones carrying a given ID.</summary>
    public class RecordFilter
    {
        private readonly List<IDValue> entries = new List<IDValue>();

        public void Add(IDValue entry) => entries.Add(entry);

        public int SumByLabel(IDForm filterLabel) =>
            entries.Where(e => e.ID.Equals(filterLabel)).Sum(e => e.Value);
    }

    public static class TemperatureConverter
    {
        /// <summary>Truncates toward zero, so -40F comes out -40C.</summary>
        public static int FahrenheitToCelsius(int fahrenheit) => (fahrenheit - 32) * 5 / 9;
    }

    public class Calculator
    {
        public int Add(int a, int b) => a + b;
    }

    // -----------------------------------------------------------------------
    // Shopping
    // -----------------------------------------------------------------------

    public class Address
    {
        public readonly SimpleText Street, City, State, ZIP;

        public Address(SimpleText street, SimpleText city, SimpleText state, SimpleText zip)
        {
            Street = street; City = city; State = state; ZIP = zip;
        }
    }

    public class CatalogItem
    {
        public readonly SimpleText Name;
        public readonly Dollar Price;

        public CatalogItem(SimpleText name, Dollar price) { Name = name; Price = price; }

        public override bool Equals(object obj) =>
            obj is CatalogItem c && c.Name.Equals(Name) && c.Price.Equals(Price);
        public override int GetHashCode() => Name.GetHashCode() ^ Price.GetHashCode();
    }

    /// <summary>The items on offer, each with the price an order line is charged.</summary>
    public class Catalog
    {
        public const int Minimum = 0;
        public const int Maximum = 10000000;

        private readonly List<CatalogItem> items = new List<CatalogItem>();

        public void Add(CatalogItem item) => items.Add(item);
        public List<CatalogItem> Read() => new List<CatalogItem>(items);
        public int Size => items.Count;

        public Dollar PriceFor(SimpleText name) =>
            items.FirstOrDefault(i => i.Name.Equals(name))?.Price;
    }

    public class OrderItem
    {
        public readonly SimpleText Name;
        public readonly int Quantity;
        public readonly Dollar Price;
        public readonly Dollar ItemTotal;

        public OrderItem(SimpleText name, int quantity, Dollar price, Dollar itemTotal)
        {
            Name = name; Quantity = quantity; Price = price; ItemTotal = itemTotal;
        }

        public static OrderItem Create(SimpleText name, int quantity, Dollar price) =>
            new OrderItem(name, quantity, price, price.Times(quantity));

        /// <summary>Looks the price up rather than being told it.</summary>
        public static OrderItem FromCatalog(Catalog catalog, SimpleText name, int quantity)
        {
            var price = catalog.PriceFor(name);
            return price == null ? null : Create(name, quantity, price);
        }
    }

    public class OrderItemCollection
    {
        public const int Minimum = 0;
        public const int Maximum = 100;

        private readonly List<OrderItem> items = new List<OrderItem>();

        public void Add(OrderItem item) => items.Add(item);
        public List<OrderItem> Read() => new List<OrderItem>(items);
        public int Size => items.Count;

        public Dollar ComputeTotal()
        {
            var total = new Dollar(0);
            foreach (var i in items) total = total.Plus(i.ItemTotal);
            return total;
        }
    }

    public class ShoppingCart
    {
        public readonly OrderItemCollection Items;
        public readonly Address ShippingAddress;
        public readonly Address BillingAddress;

        public ShoppingCart(OrderItemCollection items,
                            Address shippingAddress = null,
                            Address billingAddress = null)
        {
            Items = items;
            ShippingAddress = shippingAddress;
            BillingAddress = billingAddress;
        }

        // --- the two business rules ---------------------------------------

        /// <summary>Free once the order reaches $100, otherwise a flat $5.</summary>
        public static Dollar ShippingCostFor(Dollar totalPrice) =>
            totalPrice.Cents >= 10000 ? new Dollar(0) : new Dollar(500);

        /// <summary>Tiered: under $25 nothing, to $99.99 five percent, $100 up ten.</summary>
        public static Percentage DiscountFor(Dollar totalPrice)
        {
            if (totalPrice.Cents >= 10000) return new Percentage(10);
            if (totalPrice.Cents >= 2500) return new Percentage(5);
            return new Percentage(0);
        }

        // --- the Total Cart Price rule, over a bare item total -------------
        //
        // Stated as functions of the item total so the rule can be checked
        // straight from its Examples table, which gives a TotalItems figure and
        // no items. "Discount applied before shipping calculated", per that
        // table's own note.

        /// <summary>The discount as money: the tiered percentage of the total.</summary>
        public static Dollar DiscountAmountFor(Dollar totalItems) =>
            totalItems.PercentOf(DiscountFor(totalItems));

        /// <summary>Shipping is judged on what the customer pays, so after the discount.</summary>
        public static Dollar ShippingFor(Dollar totalItems) =>
            ShippingCostFor(totalItems.Minus(DiscountAmountFor(totalItems)));

        /// <summary>Item total, less the discount, plus shipping.</summary>
        public static Dollar TotalPriceFor(Dollar totalItems) =>
            totalItems.Minus(DiscountAmountFor(totalItems)).Plus(ShippingFor(totalItems));

        // --- what this cart comes to ---------------------------------------

        /// <summary>What the items come to before any discount or shipping.</summary>
        public Dollar Subtotal() => Items.ComputeTotal();

        public Dollar DiscountAmount() => DiscountAmountFor(Subtotal());

        public Dollar ShippingCost() => ShippingFor(Subtotal());

        public Dollar ComputeTotal() => TotalPriceFor(Subtotal());
    }
}
