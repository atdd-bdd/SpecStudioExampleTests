from . import json_util as _json
from .address_components_string import AddressComponentsString

class AddressComponentsTyped:
    def __init__(self, zip: str = '', street_name: str = '', city: str = '', pre_direction: str = '', suffix_direction: str = '', state: str = '', suffix_type: str = ''):
        self.zip = zip
        self.street_name = street_name
        self.city = city
        self.pre_direction = pre_direction
        self.suffix_direction = suffix_direction
        self.state = state
        self.suffix_type = suffix_type

    @classmethod
    def from_string_obj(cls, s: AddressComponentsString) -> 'AddressComponentsTyped':
        return cls(
            s.zip,
            s.street_name,
            s.city,
            s.pre_direction,
            s.suffix_direction,
            s.state,
            s.suffix_type
        )

    def to_string_obj(self) -> AddressComponentsString:
        return AddressComponentsString(
            str(self.zip),
            str(self.street_name),
            str(self.city),
            str(self.pre_direction),
            str(self.suffix_direction),
            str(self.state),
            str(self.suffix_type)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [AddressComponentsTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'zip': self.zip,
            'streetName': self.street_name,
            'city': self.city,
            'preDirection': self.pre_direction,
            'suffixDirection': self.suffix_direction,
            'state': self.state,
            'suffixType': self.suffix_type,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'AddressComponentsTyped':
        return cls(
            _json.as_str(_json.require(m, 'zip'), 'zip'),
            _json.as_str(_json.require(m, 'streetName'), 'streetName'),
            _json.as_str(_json.require(m, 'city'), 'city'),
            _json.as_str(_json.require(m, 'preDirection'), 'preDirection'),
            _json.as_str(_json.require(m, 'suffixDirection'), 'suffixDirection'),
            _json.as_str(_json.require(m, 'state'), 'state'),
            _json.as_str(_json.require(m, 'suffixType'), 'suffixType')
        )

    @classmethod
    def from_json(cls, text: str) -> 'AddressComponentsTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'AddressComponentsTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'zip={self.zip}' + ', ' +
                f'streetName={self.street_name}' + ', ' +
                f'city={self.city}' + ', ' +
                f'preDirection={self.pre_direction}' + ', ' +
                f'suffixDirection={self.suffix_direction}' + ', ' +
                f'state={self.state}' + ', ' +
                f'suffixType={self.suffix_type}')

    def _key(self):
        return (self.zip, self.street_name, self.city, self.pre_direction, self.suffix_direction, self.state, self.suffix_type)

    def __eq__(self, other):
        if not isinstance(other, AddressComponentsTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'AddressComponentsTyped({self})'
