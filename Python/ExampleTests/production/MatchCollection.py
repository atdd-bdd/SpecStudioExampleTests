from match_ import Match


class MatchCollection:
    MINIMUM = 0
    MAXIMUM = 10000

    def __init__(self):
        self._items: list[Match] = []

    def add(self, item: Match) -> None:
        self._items.append(item)

    def delete(self, item: Match) -> bool:
        try:
            self._items.remove(item)
            return True
        except ValueError:
            return False

    def read(self) -> list[Match]:
        return list(self._items)

    def update(self, old_item: Match, new_item: Match) -> bool:
        try:
            idx = self._items.index(old_item)
            self._items[idx] = new_item
            return True
        except ValueError:
            return False

    def size(self) -> int:
        return len(self._items)
