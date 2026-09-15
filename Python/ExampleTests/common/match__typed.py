from . import json_util as _json
from .match__string import MatchString
from .address_components_typed import AddressComponentsTyped

class MatchTyped:
    def __init__(self, matched_address: str = '', address_components: 'AddressComponentsTyped' = None):
        self.matched_address = matched_address
        self.address_components = address_components

    @classmethod
    def from_string_obj(cls, s: MatchString) -> 'MatchTyped':
        return cls(
            s.matched_address,
            AddressComponentsTyped.from_string_obj(s.address_components)
        )

    def to_string_obj(self) -> MatchString:
        return MatchString(
            str(self.matched_address),
            self.address_components.to_string_obj()
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [MatchTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'matchedAddress': self.matched_address,
            'addressComponents': self.address_components.to_json_value() if self.address_components else None,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'MatchTyped':
        return cls(
            _json.as_str(_json.require(m, 'matchedAddress'), 'matchedAddress'),
            AddressComponentsTyped.from_json_value(_json.require(m, 'addressComponents'))
        )

    @classmethod
    def from_json(cls, text: str) -> 'MatchTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'MatchTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'matchedAddress={self.matched_address}' + ', ' +
                f'addressComponents={self.address_components}')

    def _key(self):
        return (self.matched_address, self.address_components)

    def __eq__(self, other):
        if not isinstance(other, MatchTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'MatchTyped({self})'
