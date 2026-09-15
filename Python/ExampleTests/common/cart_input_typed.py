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

    def to_string_obj(self) -> CartInputString:
        return CartInputString(
            str(self.total_items),
            str(self.shipping),
            str(self.discount),
            str(self.total_price),
            str(self.notes)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [CartInputTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'TotalItems': self.total_items,
            'Shipping': self.shipping,
            'Discount': self.discount,
            'Total Price': self.total_price,
            'Notes': self.notes,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'CartInputTyped':
        return cls(
            _json.as_str(_json.require(m, 'TotalItems'), 'TotalItems'),
            _json.as_str(_json.require(m, 'Shipping'), 'Shipping'),
            _json.as_str(_json.require(m, 'Discount'), 'Discount'),
            _json.as_str(_json.require(m, 'Total Price'), 'Total Price'),
            _json.as_str(_json.require(m, 'Notes'), 'Notes')
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
