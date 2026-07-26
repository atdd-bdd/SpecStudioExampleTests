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

    def to_json_value(self) -> dict:
        return {
            'name': self.name,
            'price': self.price,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'CatalogItemTyped':
        return cls(
            _json.as_str(_json.require(m, 'name'), 'name'),
            _json.as_str(_json.require(m, 'price'), 'price')
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
