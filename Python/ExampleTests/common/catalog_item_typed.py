from . import json_util as _json
from .catalog_item_string import CatalogItemString

class CatalogItemTyped:
    def __init__(self, name: str = '', price: str = ''):
        self.name = name
        self.price = price

    @classmethod
    def from_string_obj(cls, s: CatalogItemString) -> 'CatalogItemTyped':
        return cls(
            s.name,
            s.price
        )

    def to_string_obj(self) -> CatalogItemString:
        return CatalogItemString(
            str(self.name),
            str(self.price)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [CatalogItemTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Name': self.name,
            'Price': self.price,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'CatalogItemTyped':
        return cls(
            _json.as_str(_json.require(m, 'Name'), 'Name'),
            _json.as_str(_json.require(m, 'Price'), 'Price')
        )

    @classmethod
    def from_json(cls, text: str) -> 'CatalogItemTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'CatalogItemTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Name={self.name}' + ', ' +
                f'Price={self.price}')

    def _key(self):
        return (self.name, self.price)

    def __eq__(self, other):
        if not isinstance(other, CatalogItemTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'CatalogItemTyped({self})'
