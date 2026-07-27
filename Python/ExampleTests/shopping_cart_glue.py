from common import *
from production import (Catalog, CatalogItem, Dollar, OrderItem,
                        OrderItemCollection, Percentage, ShoppingCart, SimpleText)


class ShoppingCartGlue:
    DNC_STRING = '?DNC?'

    def __init__(self):
        self.catalog = Catalog()
        self.current_items = OrderItemCollection()
        self.cart_shipping_address = None
        self.cart_billing_address = None
        self.computed_total = None

    def _cart(self) -> ShoppingCart:
        return ShoppingCart(self.current_items, self.cart_shipping_address,
                            self.cart_billing_address)

    def given_catalog_has(self, values: list):
        for value in values:
            typed = CatalogItemTyped.from_string_obj(value)
            self.catalog.add(CatalogItem(SimpleText(typed.name), Dollar(typed.price)))

    def given_item_collection_is(self, values: list):
        self.given_item_collection(values)

    def given_item_collection(self, values: list):
        self.current_items = OrderItemCollection()
        for value in values:
            typed = OrderItemTyped.from_string_obj(value)
            self.current_items.add(OrderItem(
                SimpleText(typed.name), typed.quantity,
                Dollar(typed.price), Dollar(typed.item_total)))

    def when_item_added(self, values: list):
        for value in values:
            typed = OrderItemTyped.from_string_obj(value)
            self.current_items.add(
                OrderItem.from_catalog(self.catalog, SimpleText(typed.name), typed.quantity))

    def then_item_collection_is(self, values: list):
        expected = [
            OrderItem(SimpleText(t.name), t.quantity, Dollar(t.price), Dollar(t.item_total))
            for t in (OrderItemTyped.from_string_obj(v) for v in values)
        ]
        actual = self.current_items.read()
        assert len(expected) == len(actual), 'Item count'
        for i, (e, a) in enumerate(zip(expected, actual)):
            assert e.name == a.name, f'Item {i} name'
            assert e.quantity == a.quantity, f'Item {i} quantity'
            assert e.price == a.price, f'Item {i} price'
            assert e.item_total == a.item_total, f'Item {i} itemTotal'

    def given_shopping_cart(self, values: list):
        for value in values:
            typed = ShoppingCartTyped.from_string_obj(value)
            # Every scenario starts from =EmptyCart, which carries no data rows,
            # so begin with a fresh collection rather than resolving the Define.
            self.current_items = OrderItemCollection()
            self.cart_shipping_address = typed.shipping_address
            self.cart_billing_address = typed.billing_address

    def then_shopping_cart_is(self, values: list):
        for value in values:
            typed = ShoppingCartTyped.from_string_obj(value)
            cart = self._cart()
            # Shipping and Discount are outcomes of the two business rules, not
            # the values the Given supplied, so ask the cart for them.
            assert Dollar(typed.total_price) == cart.compute_total(), 'TotalPrice'
            assert Dollar(typed.shipping) == cart.shipping_cost(), 'Shipping'
            assert Dollar(typed.discount) == cart.discount_amount(), 'Discount'

    def when_total_computed(self):
        self.computed_total = self.current_items.compute_total()


    def examples_BusinessRule_ShippingCost(self, values: list):
        for value in values:
            typed = ShippingInputTyped.from_string_obj(value)
            actual = ShoppingCart.shipping_cost_for(Dollar(typed.total_price))
            assert Dollar(typed.shipping_cost) == actual, \
                f'Shipping cost for {typed.total_price}'

    def examples_BusinessRule_Discount(self, values: list):
        for value in values:
            typed = DiscountInputTyped.from_string_obj(value)
            actual = ShoppingCart.discount_for(Dollar(typed.total_price))
            assert Percentage(typed.discount) == actual, \
                f'Discount for {typed.total_price}'

    def examples_DataType_Percentage(self, values: list):
        for value in values:
            vvt = ValidValuesTyped.from_string_obj(value)
            failed = False
            try:
                Percentage(vvt.value)
            except ValueError:
                failed = True
            assert vvt.is_valid == (not failed), f' Value {vvt.value}'


    def then_total_of_items_is(self, values: list):
        for value in values:
            typed = ItemPriceInputTyped.from_string_obj(value)
            assert Dollar(typed.total_items) == self.current_items.compute_total(),                 'TotalItems'

    def examples_BusinessRule_TotalCartPrice(self, values: list):
        for value in values:
            typed = CartInputTyped.from_string_obj(value)
            # The rule states the whole calculation from an item total, so drive
            # it that way rather than building a cart to reach the same numbers.
            total_items = Dollar(typed.total_items)
            assert Dollar(typed.discount) == ShoppingCart.discount_amount_for(total_items),                 f'Discount for {typed.total_items}'
            assert Dollar(typed.shipping) == ShoppingCart.shipping_for(total_items),                 f'Shipping for {typed.total_items}'
            assert Dollar(typed.total_price) == ShoppingCart.total_price_for(total_items),                 f'Total Price for {typed.total_items}'
