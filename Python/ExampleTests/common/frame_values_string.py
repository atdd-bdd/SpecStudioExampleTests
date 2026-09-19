from . import tokens
DNC_STRING = '?DNC?'


class FrameValuesString:
    def __init__(self, frame: str = '', roll1: str = '', roll2: str = '', roll3: str = '', score: str = '', total_score: str = ''):
        self.frame = frame
        self.roll1 = roll1
        self.roll2 = roll2
        self.roll3 = roll3
        self.score = score
        self.total_score = total_score

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else '',
            v[3] if len(v) > 3 else '',
            v[4] if len(v) > 4 else '',
            v[5] if len(v) > 5 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 6, 'FrameValues')
        return cls(
            parts[0],
            parts[1],
            parts[2],
            parts[3],
            parts[4],
            parts[5]
        )

    def __str__(self):
        return (tokens.token(self.frame) + ' ' +
                tokens.token(self.roll1) + ' ' +
                tokens.token(self.roll2) + ' ' +
                tokens.token(self.roll3) + ' ' +
                tokens.token(self.score) + ' ' +
                tokens.token(self.total_score))

    def _key(self):
        return (self.frame, self.roll1, self.roll2, self.roll3, self.score, self.total_score)

    def __eq__(self, other):
        if not isinstance(other, FrameValuesString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'FrameValuesString({self})'
