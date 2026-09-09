from . import tokens
DNC_STRING = '?DNC?'


class AddressString:
    def __init__(self, street: str = '', city: str = '', state: str = '', zip: str = ''):
        self.street = street
        self.city = city
        self.state = state
        self.zip = zip

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else '',
            v[3] if len(v) > 3 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 4, 'Address')
        return cls(
            parts[0],
            parts[1],
            parts[2],
            parts[3]
        )

    def __str__(self):
        return (tokens.token(self.street) + ' ' +
                tokens.token(self.city) + ' ' +
                tokens.token(self.state) + ' ' +
                tokens.token(self.zip))

    def _key(self):
        return (self.street, self.city, self.state, self.zip)

    def __eq__(self, other):
        if not isinstance(other, AddressString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'AddressString({self})'
