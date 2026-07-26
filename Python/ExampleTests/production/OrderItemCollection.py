from order_item import OrderItem


class OrderItemCollection:
    MINIMUM = 0
    MAXIMUM = 100

    def __init__(self):
        self._items: list[OrderItem] = []

    def add(self, item: OrderItem) -> None:
        self._items.append(item)

    def delete(self, item: OrderItem) -> bool:
        try:
            self._items.remove(item)
            return True
        except ValueError:
            return False

    def read(self) -> list[OrderItem]:
        return list(self._items)

    def update(self, old_item: OrderItem, new_item: OrderItem) -> bool:
        try:
            idx = self._items.index(old_item)
            self._items[idx] = new_item
            return True
        except ValueError:
            return False

    def size(self) -> int:
        return len(self._items)
