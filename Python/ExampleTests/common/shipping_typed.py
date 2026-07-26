from . import json_util as _json
from .shipping_string import ShippingString

class ShippingTyped:
    def __init__(self, total_price: str = '', shipping_cost: str = '', notes: str = ''):
        self.total_price = total_price
        self.shipping_cost = shipping_cost
        self.notes = notes

    @classmethod
    def from_string_obj(cls, s: ShippingString) -> 'ShippingTyped':
        return cls(
            s.total_price,
            s.shipping_cost,
            s.notes
        )

    def to_json_value(self) -> dict:
        return {
            'total_price': self.total_price,
            'shipping_cost': self.shipping_cost,
            'notes': self.notes,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ShippingTyped':
        return cls(
            _json.as_str(_json.require(m, 'total_price'), 'total_price'),
            _json.as_str(_json.require(m, 'shipping_cost'), 'shipping_cost'),
            _json.as_str(_json.require(m, 'notes'), 'notes')
        )

    @classmethod
    def from_json(cls, text: str) -> 'ShippingTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ShippingTyped')
        return [cls.from_json_value(e) for e in raw]
