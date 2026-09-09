from .address_string import AddressString
from .address_string import AddressString
from . import tokens
DNC_STRING = '?DNC?'


class ShoppingCartString:
    def __init__(self, items: str = '', shipping: str = '', discount: str = '', total_price: str = '', shipping_address: 'AddressString' = None, billing_address: 'AddressString' = None):
        self.items = items
        self.shipping = shipping
        self.discount = discount
        self.total_price = total_price
        self.shipping_address = shipping_address
        self.billing_address = billing_address

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else '',
            v[3] if len(v) > 3 else '',
            v[4] if len(v) > 4 else '',
            v[5] if len(v) > 5 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 6, 'ShoppingCart')
        return cls(
            parts[0],
            parts[1],
            parts[2],
            parts[3],
            AddressString.from_text(parts[4]),
            AddressString.from_text(parts[5])
        )

    def __str__(self):
        return (tokens.token(self.items) + ' ' +
                tokens.token(self.shipping) + ' ' +
                tokens.token(self.discount) + ' ' +
                tokens.token(self.total_price) + ' ' +
                tokens.nested(str(self.shipping_address)) + ' ' +
                tokens.nested(str(self.billing_address)))

    def _key(self):
        return (self.items, self.shipping, self.discount, self.total_price, self.shipping_address, self.billing_address)

    def __eq__(self, other):
        if not isinstance(other, ShoppingCartString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ShoppingCartString({self})'
