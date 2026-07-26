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

    def __str__(self):
        return (f'Name={self.name}' + ', ' +
                f'Price={self.price}')

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
