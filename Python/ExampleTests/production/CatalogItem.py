from .Dollar import Dollar
from .SimpleText import SimpleText


class CatalogItem:
    def __init__(self, name: SimpleText, price: Dollar):
        self.name = name
        self.price = price

    def __eq__(self, other):
        if not isinstance(other, CatalogItem):
            return NotImplemented
        return self.name == other.name and self.price == other.price

    def __hash__(self):
        return hash((self.name, self.price))

    def __str__(self):
        return f'CatalogItem{{{self.name}, {self.price}}}'
