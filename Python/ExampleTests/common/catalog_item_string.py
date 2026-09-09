from . import tokens
DNC_STRING = '?DNC?'


class CatalogItemString:
    def __init__(self, name: str = '', price: str = ''):
        self.name = name
        self.price = price

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 2, 'CatalogItem')
        return cls(
            parts[0],
            parts[1]
        )

    def __str__(self):
        return (tokens.token(self.name) + ' ' +
                tokens.token(self.price))

    def _key(self):
        return (self.name, self.price)

    def __eq__(self, other):
        if not isinstance(other, CatalogItemString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'CatalogItemString({self})'
