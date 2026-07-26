from .address_string import AddressString
from .address_string import AddressString
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
        if not isinstance(other, ShoppingCartString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ShoppingCartString({self})'
