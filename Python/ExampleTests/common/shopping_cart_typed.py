from . import json_util as _json
from .shopping_cart_string import ShoppingCartString
from .address_typed import AddressTyped
from .address_typed import AddressTyped

class ShoppingCartTyped:
    def __init__(self, items: str = '', shipping: str = '', discount: str = '', total_price: str = '', shipping_address: 'AddressTyped' = None, billing_address: 'AddressTyped' = None):
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
            AddressTyped.from_string_obj(s.shipping_address),
            AddressTyped.from_string_obj(s.billing_address)
        )

    def to_json_value(self) -> dict:
        return {
            'items': self.items,
            'shipping': self.shipping,
            'discount': self.discount,
            'total_price': self.total_price,
            'shipping_address': self.shipping_address.to_json_value() if self.shipping_address else None,
            'billing_address': self.billing_address.to_json_value() if self.billing_address else None,
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
            AddressTyped.from_json_value(_json.require(m, 'shipping_address')),
            AddressTyped.from_json_value(_json.require(m, 'billing_address'))
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

    def __str__(self):
        return (f'Items={self.items}' + ', ' +
                f'Shipping={self.shipping}' + ', ' +
                f'Discount={self.discount}' + ', ' +
                f'TotalPrice={self.total_price}' + ', ' +
                f'ShippingAddress={self.shipping_address}' + ', ' +
                f'BillingAddress={self.billing_address}')

    def _key(self):
        return (self.items, self.shipping, self.discount, self.total_price, self.shipping_address, self.billing_address)

    def __eq__(self, other):
        if not isinstance(other, ShoppingCartTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ShoppingCartTyped({self})'
