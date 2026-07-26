DNC_STRING = '?DNC?'


class PricingString:
    def __init__(self, total_price: str = ''):
        self.total_price = total_price

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else ''
        )

    def __str__(self):
        return (f'TotalPrice={self.total_price}')

    def _key(self):
        return (self.total_price,)

    def __eq__(self, other):
        if not isinstance(other, PricingString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'PricingString({self})'
