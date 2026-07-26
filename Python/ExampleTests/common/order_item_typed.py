from . import json_util as _json
from .order_item_string import OrderItemString

class OrderItemTyped:
    def __init__(self, name: str = '', quantity: int = 0, price: str = '', item_total: str = ''):
        self.name = name
        self.quantity = quantity
        self.price = price
        self.item_total = item_total

    @classmethod
    def from_string_obj(cls, s: OrderItemString) -> 'OrderItemTyped':
        return cls(
            s.name,
            int(s.quantity) if s.quantity else 0,
            s.price,
            s.item_total
        )

    def to_json_value(self) -> dict:
        return {
            'name': self.name,
            'quantity': self.quantity,
            'price': self.price,
            'item_total': self.item_total,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'OrderItemTyped':
        return cls(
            _json.as_str(_json.require(m, 'name'), 'name'),
            _json.as_int(_json.require(m, 'quantity'), 'quantity'),
            _json.as_str(_json.require(m, 'price'), 'price'),
            _json.as_str(_json.require(m, 'item_total'), 'item_total')
        )

    @classmethod
    def from_json(cls, text: str) -> 'OrderItemTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'OrderItemTyped')
        return [cls.from_json_value(e) for e in raw]
