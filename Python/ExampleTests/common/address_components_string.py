from . import tokens
DNC_STRING = '?DNC?'


class AddressComponentsString:
    def __init__(self, zip: str = '', street_name: str = '', city: str = '', pre_direction: str = '', suffix_direction: str = '', state: str = '', suffix_type: str = ''):
        self.zip = zip
        self.street_name = street_name
        self.city = city
        self.pre_direction = pre_direction
        self.suffix_direction = suffix_direction
        self.state = state
        self.suffix_type = suffix_type

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else '',
            v[3] if len(v) > 3 else '',
            v[4] if len(v) > 4 else '',
            v[5] if len(v) > 5 else '',
            v[6] if len(v) > 6 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 7, 'AddressComponents')
        return cls(
            parts[0],
            parts[1],
            parts[2],
            parts[3],
            parts[4],
            parts[5],
            parts[6]
        )

    def __str__(self):
        return (tokens.token(self.zip) + ' ' +
                tokens.token(self.street_name) + ' ' +
                tokens.token(self.city) + ' ' +
                tokens.token(self.pre_direction) + ' ' +
                tokens.token(self.suffix_direction) + ' ' +
                tokens.token(self.state) + ' ' +
                tokens.token(self.suffix_type))

    def _key(self):
        return (self.zip, self.street_name, self.city, self.pre_direction, self.suffix_direction, self.state, self.suffix_type)

    def __eq__(self, other):
        if not isinstance(other, AddressComponentsString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'AddressComponentsString({self})'
