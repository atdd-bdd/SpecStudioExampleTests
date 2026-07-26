import decimal

from .Address import Address
from .Dollar import Dollar
from .OrderItemCollection import OrderItemCollection
from .Percentage import Percentage


class ShoppingCart:
    def __init__(self, items: OrderItemCollection,
                 shipping_address: Address = None,
                 billing_address: Address = None):
        self.items = items
        self.shipping_address = shipping_address
        self.billing_address = billing_address

    # --- the two business rules -------------------------------------------

    @staticmethod
    def shipping_cost_for(total_price: Dollar) -> Dollar:
        """Free once the order reaches $100, otherwise a flat $5."""
        if total_price.to_decimal() >= decimal.Decimal('100.00'):
            return Dollar('0')
        return Dollar('5.00')

    @staticmethod
    def discount_for(total_price: Dollar) -> Percentage:
        """Tiered: under $25 nothing, to $99.99 five percent, $100 up ten."""
        amount = total_price.to_decimal()
        if amount >= decimal.Decimal('100.00'):
            return Percentage(10)
        if amount >= decimal.Decimal('25.00'):
            return Percentage(5)
        return Percentage(0)

    # --- what the cart comes to -------------------------------------------

    def subtotal(self) -> Dollar:
        """What the items come to before any discount or shipping."""
        return self.items.compute_total()

    def discount_amount(self) -> Dollar:
        """The discount as money: the tiered percentage of the subtotal."""
        amount = self.subtotal()
        return amount.percent_of(self.discount_for(amount))

    def shipping_cost(self) -> Dollar:
        """
        Shipping is charged on what the customer actually pays, so the discount
        comes off before the $100 threshold is tested — following the scenario's
        "Apply Discount to OrderItem Total, then add shipping".
        """
        return self.shipping_cost_for(self.subtotal().minus(self.discount_amount()))

    def compute_total(self) -> Dollar:
        """Subtotal, less the discount, plus shipping."""
        return self.subtotal().minus(self.discount_amount()).plus(self.shipping_cost())

    def __str__(self):
        return f'ShoppingCart{{{self.items}, total={self.compute_total()}}}'
