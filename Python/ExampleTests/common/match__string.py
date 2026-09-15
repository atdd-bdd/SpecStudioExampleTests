from .address_components_string import AddressComponentsString
from . import tokens
DNC_STRING = '?DNC?'


class MatchString:
    def __init__(self, matched_address: str = '', address_components: 'AddressComponentsString' = None):
        self.matched_address = matched_address
        self.address_components = address_components

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
        parts = tokens.require(text, 2, 'Match')
        return cls(
            parts[0],
            AddressComponentsString.from_text(parts[1])
        )

    def __str__(self):
        return (tokens.token(self.matched_address) + ' ' +
                tokens.nested(str(self.address_components)))

    def _key(self):
        return (self.matched_address, self.address_components)

    def __eq__(self, other):
        if not isinstance(other, MatchString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'MatchString({self})'
