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

    def __str__(self):
        return (f'Street={self.street}' + ', ' +
                f'City={self.city}' + ', ' +
                f'State={self.state}' + ', ' +
                f'ZIP={self.zip}')

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
