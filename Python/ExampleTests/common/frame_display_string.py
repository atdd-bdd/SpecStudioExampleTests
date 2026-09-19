from . import tokens
DNC_STRING = '?DNC?'


class FrameDisplayString:
    def __init__(self, frame: str = '', mark1: str = '', mark2: str = '', mark3: str = '', total_score: str = ''):
        self.frame = frame
        self.mark1 = mark1
        self.mark2 = mark2
        self.mark3 = mark3
        self.total_score = total_score

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else '',
            v[3] if len(v) > 3 else '',
            v[4] if len(v) > 4 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 5, 'FrameDisplay')
        return cls(
            parts[0],
            parts[1],
            parts[2],
            parts[3],
            parts[4]
        )

    def __str__(self):
        return (tokens.token(self.frame) + ' ' +
                tokens.token(self.mark1) + ' ' +
                tokens.token(self.mark2) + ' ' +
                tokens.token(self.mark3) + ' ' +
                tokens.token(self.total_score))

    def _key(self):
        return (self.frame, self.mark1, self.mark2, self.mark3, self.total_score)

    def __eq__(self, other):
        if not isinstance(other, FrameDisplayString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'FrameDisplayString({self})'
