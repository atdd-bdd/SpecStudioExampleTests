namespace SpecStudioExamplesTestsCSharp.Shopping_Cart
{
    using System;
    using System.Collections.Generic;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
    using production;

    public class Shopping_Cart_glue
    {
        const string DNCString = "?DNC?";

        private readonly Catalog catalog = new Catalog();
        private OrderItemCollection currentItems = new OrderItemCollection();
        private Dollar computedTotal = new Dollar(0);

        private ShoppingCart Cart() => new ShoppingCart(currentItems);

        public void Given_catalog_has(List<CatalogItemString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToCatalogItemTyped();
                catalog.Add(new CatalogItem(typed.name, typed.price));
            }
        }

        public void Given_item_collection_is(List<OrderItemString> values) =>
            Given_item_collection(values);

        public void Given_item_collection(List<OrderItemString> values)
        {
            currentItems = new OrderItemCollection();
            foreach (var value in values)
            {
                var typed = value.ToOrderItemTyped();
                currentItems.Add(new OrderItem(typed.name, typed.quantity,
                                               typed.price, typed.itemTotal));
            }
        }

        public void When_item_added(List<OrderItemString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToOrderItemTyped();
                var item = OrderItem.FromCatalog(catalog, typed.name, typed.quantity);
                Assert.IsNotNull(item, $"item not in catalog: {typed.name}");
                currentItems.Add(item);
            }
        }

        public void Then_item_collection_is(List<OrderItemString> values)
        {
            var actual = currentItems.Read();
            Assert.AreEqual(values.Count, actual.Count, "Item count");
            for (int i = 0; i < values.Count; i++)
            {
                var typed = values[i].ToOrderItemTyped();
                Assert.AreEqual(typed.name, actual[i].Name, $"Item {i} name");
                Assert.AreEqual(typed.quantity, actual[i].Quantity, $"Item {i} quantity");
                Assert.AreEqual(typed.price, actual[i].Price, $"Item {i} price");
                Assert.AreEqual(typed.itemTotal, actual[i].ItemTotal, $"Item {i} itemTotal");
            }
        }

        public void Given_shopping_cart(List<ShoppingCartString> values)
        {
            // Every scenario starts from =EmptyCart, which carries no data rows,
            // so begin with a fresh collection rather than resolving the Define.
            currentItems = new OrderItemCollection();
        }

        public void Then_shopping_cart_is(List<ShoppingCartString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToShoppingCartTyped();
                var cart = Cart();
                // Shipping and Discount are outcomes of the two business rules,
                // not the values the Given supplied, so ask the cart for them.
                Assert.AreEqual(typed.totalPrice, cart.ComputeTotal(), "TotalPrice");
                Assert.AreEqual(typed.shipping, cart.ShippingCost(), "Shipping");
                Assert.AreEqual(typed.discount, cart.DiscountAmount(), "Discount");
            }
        }

        public void When_total_computed() => computedTotal = currentItems.ComputeTotal();

        public void Then_result_is(List<PricingString> values)
        {
            foreach (var value in values)
                Assert.AreEqual(value.ToPricingTyped().totalPrice, computedTotal, "TotalPrice");
        }

        public void Examples_BusinessRule_Shipping_Cost(List<ShippingInputString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToShippingInputTyped();
                Assert.AreEqual(typed.shippingCost,
                                ShoppingCart.ShippingCostFor(typed.totalPrice),
                                $"Shipping cost for {typed.totalPrice}");
            }
        }

        public void Examples_BusinessRule_Discount(List<DiscountInputString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToDiscountInputTyped();
                Assert.AreEqual(typed.discount,
                                ShoppingCart.DiscountFor(typed.totalPrice),
                                $"Discount for {typed.totalPrice}");
            }
        }

        public void Examples_DataType_Percentage(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                var vvt = value.ToValidValuesTyped();
                bool failed = false;
                try { new Percentage(vvt.value); } catch (FormatException) { failed = true; }
                Assert.AreEqual(vvt.isValid, !failed, $" Value {vvt.value}");
            }
        }

        public void Then_total_of_items_is(List<ItemPriceInputString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToItemPriceInputTyped();
                Assert.AreEqual(typed.totalItems, currentItems.ComputeTotal(), "TotalItems");
            }
        }

        public void Examples_BusinessRule_Total_Cart_Price(List<CartInputString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToCartInputTyped();
                // The rule states the whole calculation from an item total, so
                // drive it that way rather than building a cart to match.
                var total = typed.totalItems;
                Assert.AreEqual(typed.discount, ShoppingCart.DiscountAmountFor(total),
                                $"Discount for {total}");
                Assert.AreEqual(typed.shipping, ShoppingCart.ShippingFor(total),
                                $"Shipping for {total}");
                Assert.AreEqual(typed.totalPrice, ShoppingCart.TotalPriceFor(total),
                                $"Total Price for {total}");
            }
        }

    }
}
