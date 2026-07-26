DNC_STRING = '?DNC?'


class FandCString:
    def __init__(self, f: str = '', c: str = '', notes: str = ''):
        self.f = f
        self.c = c
        self.notes = notes

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else ''
        )

    def __str__(self):
        return (f'F={self.f}' + ', ' +
                f'C={self.c}' + ', ' +
                f'Notes={self.notes}')

    def _key(self):
        return (self.f, self.c, self.notes)

    def __eq__(self, other):
        if not isinstance(other, FandCString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'FandCString({self})'
