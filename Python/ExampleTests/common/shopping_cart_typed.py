from . import json_util as _json
from .shopping_cart_string import ShoppingCartString

class ShoppingCartTyped:
    def __init__(self, items: str = '', shipping: str = '', discount: str = '', total_price: str = '', shipping_address: str = '', billing_address: str = ''):
        self.items = items
        self.shipping = shipping
        self.discount = discount
        self.total_price = total_price
        self.shipping_address = shipping_address
        self.billing_address = billing_address

    @classmethod
    def from_string_obj(cls, s: ShoppingCartString) -> 'ShoppingCartTyped':
        return cls(
            s.items,
            s.shipping,
            s.discount,
            s.total_price,
            s.shipping_address,
            s.billing_address
        )

    def to_json_value(self) -> dict:
        return {
            'items': self.items,
            'shipping': self.shipping,
            'discount': self.discount,
            'total_price': self.total_price,
            'shipping_address': self.shipping_address,
            'billing_address': self.billing_address,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ShoppingCartTyped':
        return cls(
            _json.as_str(_json.require(m, 'items'), 'items'),
            _json.as_str(_json.require(m, 'shipping'), 'shipping'),
            _json.as_str(_json.require(m, 'discount'), 'discount'),
            _json.as_str(_json.require(m, 'total_price'), 'total_price'),
            _json.as_str(_json.require(m, 'shipping_address'), 'shipping_address'),
            _json.as_str(_json.require(m, 'billing_address'), 'billing_address')
        )

    @classmethod
    def from_json(cls, text: str) -> 'ShoppingCartTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ShoppingCartTyped')
        return [cls.from_json_value(e) for e in raw]
