from catalog_item import CatalogItem


class Catalog:
    MINIMUM = 0
    MAXIMUM = 10000000

    def __init__(self):
        self._items: list[CatalogItem] = []

    def add(self, item: CatalogItem) -> None:
        self._items.append(item)

    def delete(self, item: CatalogItem) -> bool:
        try:
            self._items.remove(item)
            return True
        except ValueError:
            return False

    def read(self) -> list[CatalogItem]:
        return list(self._items)

    def update(self, old_item: CatalogItem, new_item: CatalogItem) -> bool:
        try:
            idx = self._items.index(old_item)
            self._items[idx] = new_item
            return True
        except ValueError:
            return False

    def size(self) -> int:
        return len(self._items)
