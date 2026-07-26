DNC_STRING = '?DNC?'


class ResultValueString:
    def __init__(self, sum: str = ''):
        self.sum = sum

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else ''
        )

    def __str__(self):
        return (f'Sum={self.sum}')

    def _key(self):
        return (self.sum,)

    def __eq__(self, other):
        if not isinstance(other, ResultValueString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ResultValueString({self})'
