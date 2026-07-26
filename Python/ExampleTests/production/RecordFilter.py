from .IDForm import IDForm
from .IDValue import IDValue


class RecordFilter:
    """Holds IDValue records and sums the ones carrying a given ID."""

    def __init__(self):
        self._entries: list[IDValue] = []

    def add(self, entry: IDValue) -> None:
        self._entries.append(entry)

    def sum_by_label(self, filter_label: IDForm) -> int:
        return sum(e.value for e in self._entries if e.id == filter_label)
