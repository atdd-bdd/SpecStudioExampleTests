package spectable;

import java.util.List;

import production.Catalog;
import production.CatalogItem;
import production.Dollar;
import production.OrderItem;
import production.OrderItemCollection;
import production.Percentage;
import production.ShoppingCart;
import spectable.common.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Shopping_Cart_glue {
    private static final String DNCString = "?DNC?";

    private final Catalog catalog = new Catalog();
    private OrderItemCollection currentItems = new OrderItemCollection();
    private Dollar cartShipping;
    private Dollar cartDiscount;
    private AddressTyped cartShippingAddress;
    private AddressTyped cartBillingAddress;
    private Dollar computedTotal;

    private static void assertDollarEquals(Dollar expected, Dollar actual, String field) {
        assertEquals(0, expected.toDecimal().compareTo(actual.toDecimal()), field);
    }

    private static void assertPercentageEquals(Percentage expected, Percentage actual, String field) {
        assertEquals(0, expected.toDecimal().compareTo(actual.toDecimal()), field);
    }

    public void Given_catalog_has(List<CatalogItemString> values) {
        for (CatalogItemString value : values) {
            CatalogItemTyped typed = new CatalogItemTyped(value);
            catalog.add(new CatalogItem(typed.name, typed.price));
        }
    }

    public void Given_shopping_cart(List<ShoppingCartString> values) {
        for (ShoppingCartString value : values) {
            ShoppingCartTyped typed = new ShoppingCartTyped(value);
            // typed.items is always empty here (every scenario starts from
            // =EmptyCart, which has no data rows) -- start the working item
            // collection fresh rather than relying on Define-reference resolution.
            currentItems = new OrderItemCollection();
            cartShipping = typed.shipping;
            cartDiscount = typed.discount;
            cartShippingAddress = typed.shippingAddress;
            cartBillingAddress = typed.billingAddress;
        }
    }

    public void When_item_added(List<OrderItemString> values) {
        for (OrderItemString value : values) {
            OrderItemTyped typed = new OrderItemTyped(value);
            OrderItem item = OrderItem.create(catalog, typed.name, typed.quantity);
            currentItems.add(item);
        }
    }

    private ShoppingCart currentCart() {
        return new ShoppingCart(
            currentItems,
            cartShipping,
            cartDiscount,
            new Dollar("0"),
            ProductionHelper.AddressTypedToProduction(cartShippingAddress),
            ProductionHelper.AddressTypedToProduction(cartBillingAddress));
    }

    public void Then_shopping_cart_is(List<ShoppingCartString> values) {
        for (ShoppingCartString value : values) {
            ShoppingCartTyped typed = new ShoppingCartTyped(value);
            Dollar actualTotal = currentCart().computeTotal();

            assertDollarEquals(typed.totalPrice, actualTotal, "TotalPrice");
            assertDollarEquals(typed.shipping, cartShipping, "Shipping");
            assertDollarEquals(typed.discount, cartDiscount, "Discount");
            assertEquals(typed.shippingAddress, cartShippingAddress, "ShippingAddress");
            assertEquals(typed.billingAddress, cartBillingAddress, "BillingAddress");
        }
    }

    public void Given_item_collection(List<OrderItemString> values) {
        currentItems = new OrderItemCollection();
        for (OrderItemString value : values) {
            OrderItemTyped typed = new OrderItemTyped(value);
            currentItems.add(new OrderItem(typed.name, typed.quantity, typed.price, typed.itemTotal));
        }
    }

    public void When_total_computed() {
        computedTotal = currentItems.computeTotal();
    }

    public void Then_result_is(List<PricingString> values) {
        for (PricingString value : values) {
            PricingTyped typed = new PricingTyped(value);
            assertDollarEquals(typed.totalPrice, computedTotal, "TotalPrice");
        }
    }

    public void Given_item_collection_is(List<OrderItemString> values) {
        Given_item_collection(values);
    }

    public void Then_item_collection_is(List<OrderItemString> values) {
        OrderItemCollection expected = new OrderItemCollection();
        for (OrderItemString value : values) {
            OrderItemTyped typed = new OrderItemTyped(value);
            expected.add(new OrderItem(typed.name, typed.quantity, typed.price, typed.itemTotal));
        }

        assertEquals(expected.size(), currentItems.size(), "Item count");
        for (int i = 0; i < expected.size(); i++) {
            OrderItem e = expected.read().get(i);
            OrderItem a = currentItems.read().get(i);
            assertEquals(e.name.value, a.name.value, "Item " + i + " name");
            assertEquals(e.quantity, a.quantity, "Item " + i + " quantity");
            assertDollarEquals(e.price, a.price, "Item " + i + " price");
            assertDollarEquals(e.itemTotal, a.itemTotal, "Item " + i + " itemTotal");
        }
    }

    public void Examples_BusinessRule_Shipping_Cost(List<ShippingString> values) {
        for (ShippingString value : values) {
            ShippingTyped typed = new ShippingTyped(value);
            Dollar actual = ShoppingCart.shippingCostFor(typed.totalPrice);
            assertDollarEquals(typed.shippingCost, actual, "Shipping cost for " + typed.totalPrice.value);
        }
    }

    public void Examples_BusinessRule_Discount(List<DiscountingString> values) {
        for (DiscountingString value : values) {
            DiscountingTyped typed = new DiscountingTyped(value);
            Percentage actual = ShoppingCart.discountFor(typed.totalPrice);
            assertPercentageEquals(typed.discount, actual, "Discount for " + typed.totalPrice.value);
        }
    }

    public void Examples_DataType_Percentage(List<ValidValuesString> values) {
        for (ValidValuesString value : values) {
            boolean error = false;
            ValidValuesTyped vvt = new ValidValuesTyped(value);
            try {
                new Percentage(vvt.value);
            }
            catch (NumberFormatException e) {
                error = true;
            }
            assertEquals(vvt.isValid.toBoolean(), !error, " Value " + vvt.value);
        }
    }
}
