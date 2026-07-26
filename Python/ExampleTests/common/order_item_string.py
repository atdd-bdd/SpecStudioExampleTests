DNC_STRING = '?DNC?'


class OrderItemString:
    def __init__(self, name: str = '', quantity: str = '', price: str = '', item_total: str = ''):
        self.name = name
        self.quantity = quantity
        self.price = price
        self.item_total = item_total

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else '',
            v[3] if len(v) > 3 else ''
        )

    def __str__(self):
        return (f'Name={self.name}' + ', ' +
                f'Quantity={self.quantity}' + ', ' +
                f'Price={self.price}' + ', ' +
                f'ItemTotal={self.item_total}')

    def _key(self):
        return (self.name, self.quantity, self.price, self.item_total)

    def __eq__(self, other):
        if not isinstance(other, OrderItemString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'OrderItemString({self})'
