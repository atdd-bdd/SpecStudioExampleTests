from . import tokens
DNC_STRING = '?DNC?'


class ShippingInputString:
    def __init__(self, total_price: str = '', shipping_cost: str = '', notes: str = ''):
        self.total_price = total_price
        self.shipping_cost = shipping_cost
        self.notes = notes

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 3, 'ShippingInput')
        return cls(
            parts[0],
            parts[1],
            parts[2]
        )

    def __str__(self):
        return (tokens.token(self.total_price) + ' ' +
                tokens.token(self.shipping_cost) + ' ' +
                tokens.token(self.notes))

    def _key(self):
        return (self.total_price, self.shipping_cost, self.notes)

    def __eq__(self, other):
        if not isinstance(other, ShippingInputString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ShippingInputString({self})'
