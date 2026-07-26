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

    # --- the Total Cart Price rule, over a bare item total -----------------
    #
    # Stated as functions of the item total so the rule can be checked straight
    # from its Examples table, which gives a TotalItems figure and no items.
    # "Discount applied before shipping calculated", per that table's own note.

    @classmethod
    def discount_amount_for(cls, total_items: Dollar) -> Dollar:
        """The discount as money: the tiered percentage of the item total."""
        return total_items.percent_of(cls.discount_for(total_items))

    @classmethod
    def shipping_for(cls, total_items: Dollar) -> Dollar:
        """Shipping is judged on what the customer pays, so after the discount."""
        return cls.shipping_cost_for(total_items.minus(cls.discount_amount_for(total_items)))

    @classmethod
    def total_price_for(cls, total_items: Dollar) -> Dollar:
        """Item total, less the discount, plus shipping."""
        return (total_items.minus(cls.discount_amount_for(total_items))
                           .plus(cls.shipping_for(total_items)))

    # --- what this cart comes to ------------------------------------------

    def subtotal(self) -> Dollar:
        """What the items come to before any discount or shipping."""
        return self.items.compute_total()

    def discount_amount(self) -> Dollar:
        return self.discount_amount_for(self.subtotal())

    def shipping_cost(self) -> Dollar:
        return self.shipping_for(self.subtotal())

    def compute_total(self) -> Dollar:
        return self.total_price_for(self.subtotal())

    def __str__(self):
        return f'ShoppingCart{{{self.items}, total={self.compute_total()}}}'
