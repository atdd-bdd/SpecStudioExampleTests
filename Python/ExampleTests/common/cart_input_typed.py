from . import json_util as _json
from .cart_input_string import CartInputString

class CartInputTyped:
    def __init__(self, total_items: str = '', shipping: str = '', discount: str = '', total_price: str = '', notes: str = ''):
        self.total_items = total_items
        self.shipping = shipping
        self.discount = discount
        self.total_price = total_price
        self.notes = notes

    @classmethod
    def from_string_obj(cls, s: CartInputString) -> 'CartInputTyped':
        return cls(
            s.total_items,
            s.shipping,
            s.discount,
            s.total_price,
            s.notes
        )

    def to_json_value(self) -> dict:
        return {
            'total_items': self.total_items,
            'shipping': self.shipping,
            'discount': self.discount,
            'total_price': self.total_price,
            'notes': self.notes,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'CartInputTyped':
        return cls(
            _json.as_str(_json.require(m, 'total_items'), 'total_items'),
            _json.as_str(_json.require(m, 'shipping'), 'shipping'),
            _json.as_str(_json.require(m, 'discount'), 'discount'),
            _json.as_str(_json.require(m, 'total_price'), 'total_price'),
            _json.as_str(_json.require(m, 'notes'), 'notes')
        )

    @classmethod
    def from_json(cls, text: str) -> 'CartInputTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'CartInputTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'TotalItems={self.total_items}' + ', ' +
                f'Shipping={self.shipping}' + ', ' +
                f'Discount={self.discount}' + ', ' +
                f'Total Price={self.total_price}' + ', ' +
                f'Notes={self.notes}')

    def _key(self):
        return (self.total_items, self.shipping, self.discount, self.total_price, self.notes)

    def __eq__(self, other):
        if not isinstance(other, CartInputTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'CartInputTyped({self})'
