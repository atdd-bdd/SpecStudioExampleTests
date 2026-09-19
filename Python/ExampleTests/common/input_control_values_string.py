from . import tokens
DNC_STRING = '?DNC?'


class InputControlValuesString:
    def __init__(self, frame: str = '', roll: str = '', remaining: str = ''):
        self.frame = frame
        self.roll = roll
        self.remaining = remaining

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
        parts = tokens.require(text, 3, 'InputControlValues')
        return cls(
            parts[0],
            parts[1],
            parts[2]
        )

    def __str__(self):
        return (tokens.token(self.frame) + ' ' +
                tokens.token(self.roll) + ' ' +
                tokens.token(self.remaining))

    def _key(self):
        return (self.frame, self.roll, self.remaining)

    def __eq__(self, other):
        if not isinstance(other, InputControlValuesString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'InputControlValuesString({self})'
