from . import tokens
DNC_STRING = '?DNC?'


class CartInputString:
    def __init__(self, total_items: str = '', shipping: str = '', discount: str = '', total_price: str = '', notes: str = ''):
        self.total_items = total_items
        self.shipping = shipping
        self.discount = discount
        self.total_price = total_price
        self.notes = notes

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else '',
            v[3] if len(v) > 3 else '',
            v[4] if len(v) > 4 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 5, 'CartInput')
        return cls(
            parts[0],
            parts[1],
            parts[2],
            parts[3],
            parts[4]
        )

    def __str__(self):
        return (tokens.token(self.total_items) + ' ' +
                tokens.token(self.shipping) + ' ' +
                tokens.token(self.discount) + ' ' +
                tokens.token(self.total_price) + ' ' +
                tokens.token(self.notes))

    def _key(self):
        return (self.total_items, self.shipping, self.discount, self.total_price, self.notes)

    def __eq__(self, other):
        if not isinstance(other, CartInputString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'CartInputString({self})'
