from . import json_util as _json
from .address_string import AddressString

class AddressTyped:
    def __init__(self, street: str = '', city: str = '', state: str = '', zip: str = ''):
        self.street = street
        self.city = city
        self.state = state
        self.zip = zip

    @classmethod
    def from_string_obj(cls, s: AddressString) -> 'AddressTyped':
        return cls(
            s.street,
            s.city,
            s.state,
            s.zip
        )

    def to_string_obj(self) -> AddressString:
        return AddressString(
            str(self.street),
            str(self.city),
            str(self.state),
            str(self.zip)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [AddressTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Street': self.street,
            'City': self.city,
            'State': self.state,
            'ZIP': self.zip,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'AddressTyped':
        return cls(
            _json.as_str(_json.require(m, 'Street'), 'Street'),
            _json.as_str(_json.require(m, 'City'), 'City'),
            _json.as_str(_json.require(m, 'State'), 'State'),
            _json.as_str(_json.require(m, 'ZIP'), 'ZIP')
        )

    @classmethod
    def from_json(cls, text: str) -> 'AddressTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'AddressTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Street={self.street}' + ', ' +
                f'City={self.city}' + ', ' +
                f'State={self.state}' + ', ' +
                f'ZIP={self.zip}')

    def _key(self):
        return (self.street, self.city, self.state, self.zip)

    def __eq__(self, other):
        if not isinstance(other, AddressTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'AddressTyped({self})'
