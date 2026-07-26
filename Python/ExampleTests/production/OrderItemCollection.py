from .Dollar import Dollar
from .OrderItem import OrderItem

ORDER_ITEM_COLLECTION_MINIMUM = 0
ORDER_ITEM_COLLECTION_MAXIMUM = 100


class OrderItemCollection:
    def __init__(self):
        self._items: list[OrderItem] = []

    def add(self, item: OrderItem) -> None:
        self._items.append(item)

    def read(self) -> list[OrderItem]:
        return list(self._items)

    def size(self) -> int:
        return len(self._items)

    def compute_total(self) -> Dollar:
        total = Dollar('0')
        for item in self._items:
            total = total.plus(item.item_total)
        return total

    def __eq__(self, other):
        if not isinstance(other, OrderItemCollection):
            return NotImplemented
        return self._items == other._items

    def __str__(self):
        return f'OrderItemCollection{{{len(self._items)} items}}'
