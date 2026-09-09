from . import tokens
DNC_STRING = '?DNC?'


class AdderString:
    def __init__(self, number1: str = '', number2: str = '', result: str = ''):
        self.number1 = number1
        self.number2 = number2
        self.result = result

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
        parts = tokens.require(text, 3, 'Adder')
        return cls(
            parts[0],
            parts[1],
            parts[2]
        )

    def __str__(self):
        return (tokens.token(self.number1) + ' ' +
                tokens.token(self.number2) + ' ' +
                tokens.token(self.result))

    def _key(self):
        return (self.number1, self.number2, self.result)

    def __eq__(self, other):
        if not isinstance(other, AdderString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'AdderString({self})'
