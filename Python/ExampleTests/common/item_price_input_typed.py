from . import json_util as _json
from .item_price_input_string import ItemPriceInputString

class ItemPriceInputTyped:
    def __init__(self, total_items: str = ''):
        self.total_items = total_items

    @classmethod
    def from_string_obj(cls, s: ItemPriceInputString) -> 'ItemPriceInputTyped':
        return cls(
            s.total_items
        )

    def to_string_obj(self) -> ItemPriceInputString:
        return ItemPriceInputString(
            str(self.total_items)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [ItemPriceInputTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'TotalItems': self.total_items,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ItemPriceInputTyped':
        return cls(
            _json.as_str(_json.require(m, 'TotalItems'), 'TotalItems')
        )

    @classmethod
    def from_json(cls, text: str) -> 'ItemPriceInputTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ItemPriceInputTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'TotalItems={self.total_items}')

    def _key(self):
        return (self.total_items,)

    def __eq__(self, other):
        if not isinstance(other, ItemPriceInputTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ItemPriceInputTyped({self})'
