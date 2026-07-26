from .Catalog import Catalog
from .Dollar import Dollar
from .SimpleText import SimpleText


class OrderItem:
    def __init__(self, name: SimpleText, quantity: int,
                 price: Dollar, item_total: Dollar):
        self.name = name
        self.quantity = quantity
        self.price = price
        self.item_total = item_total

    @staticmethod
    def create(name: SimpleText, quantity: int, price: Dollar) -> 'OrderItem':
        return OrderItem(name, quantity, price, price.times(quantity))

    @staticmethod
    def from_catalog(catalog: Catalog, name: SimpleText, quantity: int) -> 'OrderItem':
        """Looks the price up rather than being told it."""
        return OrderItem.create(name, quantity, catalog.price_for(name))

    def __eq__(self, other):
        if not isinstance(other, OrderItem):
            return NotImplemented
        return (self.name, self.quantity, self.price, self.item_total) == \
               (other.name, other.quantity, other.price, other.item_total)

    def __hash__(self):
        return hash((self.name, self.quantity, self.price, self.item_total))

    def __str__(self):
        return (f'OrderItem{{{self.name}, {self.quantity}, '
                f'{self.price}, {self.item_total}}}')
