from . import tokens
DNC_STRING = '?DNC?'


class SimpleClassString:
    def __init__(self, an_int: str = '', a_string: str = ''):
        self.an_int = an_int
        self.a_string = a_string

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
        parts = tokens.require(text, 2, 'SimpleClass')
        return cls(
            parts[0],
            parts[1]
        )

    def __str__(self):
        return (tokens.token(self.an_int) + ' ' +
                tokens.token(self.a_string))

    def _key(self):
        return (self.an_int, self.a_string)

    def __eq__(self, other):
        if not isinstance(other, SimpleClassString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'SimpleClassString({self})'
