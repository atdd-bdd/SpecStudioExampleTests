from . import json_util as _json
from .shopping_cart_string import ShoppingCartString
from .order_item_typed import OrderItemTyped
from .address_typed import AddressTyped
from .address_typed import AddressTyped

class ShoppingCartTyped:
    def __init__(self, items: list = None, shipping: str = '', discount: str = '', total_price: str = '', shipping_address: 'AddressTyped' = None, billing_address: 'AddressTyped' = None):
        self.items = items if items is not None else []
        self.shipping = shipping
        self.discount = discount
        self.total_price = total_price
        self.shipping_address = shipping_address
        self.billing_address = billing_address

    @classmethod
    def from_string_obj(cls, s: ShoppingCartString) -> 'ShoppingCartTyped':
        return cls(
            [],
            s.shipping,
            s.discount,
            s.total_price,
            AddressTyped.from_string_obj(s.shipping_address),
            AddressTyped.from_string_obj(s.billing_address)
        )

    def to_string_obj(self) -> ShoppingCartString:
        return ShoppingCartString(
            '',
            str(self.shipping),
            str(self.discount),
            str(self.total_price),
            self.shipping_address.to_string_obj(),
            self.billing_address.to_string_obj()
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [ShoppingCartTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Items': [e.to_json_value() for e in self.items],
            'Shipping': self.shipping,
            'Discount': self.discount,
            'TotalPrice': self.total_price,
            'ShippingAddress': self.shipping_address.to_json_value() if self.shipping_address else None,
            'BillingAddress': self.billing_address.to_json_value() if self.billing_address else None,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ShoppingCartTyped':
        return cls(
            [OrderItemTyped.from_json_value(e) for e in _json.as_list(_json.require(m, 'Items'), 'Items')],
            _json.as_str(_json.require(m, 'Shipping'), 'Shipping'),
            _json.as_str(_json.require(m, 'Discount'), 'Discount'),
            _json.as_str(_json.require(m, 'TotalPrice'), 'TotalPrice'),
            AddressTyped.from_json_value(_json.require(m, 'ShippingAddress')),
            AddressTyped.from_json_value(_json.require(m, 'BillingAddress'))
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
