from .CatalogItem import CatalogItem
from .Dollar import Dollar
from .SimpleText import SimpleText

CATALOG_MINIMUM = 0
CATALOG_MAXIMUM = 10000000


class Catalog:
    """The items on offer, each with the price an order line is charged."""

    def __init__(self):
        self._items: list[CatalogItem] = []

    def add(self, item: CatalogItem) -> None:
        self._items.append(item)

    def read(self) -> list[CatalogItem]:
        return list(self._items)

    def size(self) -> int:
        return len(self._items)

    def price_for(self, name: SimpleText) -> Dollar:
        for item in self._items:
            if item.name == name:
                return item.price
        raise KeyError(f'No catalog item named {name}')
