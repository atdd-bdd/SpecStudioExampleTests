DNC_STRING = '?DNC?'


class IDValueString:
    def __init__(self, id: str = '', value: str = ''):
        self.id = id
        self.value = value

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else ''
        )

    def __str__(self):
        return (f'ID={self.id}' + ', ' +
                f'Value={self.value}')

    def _key(self):
        return (self.id, self.value)

    def __eq__(self, other):
        if not isinstance(other, IDValueString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'IDValueString({self})'
