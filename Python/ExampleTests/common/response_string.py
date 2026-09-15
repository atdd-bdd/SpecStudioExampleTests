from .result_string import ResultString
from . import tokens
DNC_STRING = '?DNC?'


class ResponseString:
    def __init__(self, result: 'ResultString' = None):
        self.result = result

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 1, 'Response')
        return cls(
            ResultString.from_text(parts[0])
        )

    def __str__(self):
        return (tokens.nested(str(self.result)))

    def _key(self):
        return (self.result,)

    def __eq__(self, other):
        if not isinstance(other, ResponseString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ResponseString({self})'
