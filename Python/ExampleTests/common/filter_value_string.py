DNC_STRING = '?DNC?'


class FilterValueString:
    def __init__(self, value: str = ''):
        self.value = value

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else ''
        )

    def __str__(self):
        return (f'Value={self.value}')

    def _key(self):
        return (self.value,)

    def __eq__(self, other):
        if not isinstance(other, FilterValueString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'FilterValueString({self})'
