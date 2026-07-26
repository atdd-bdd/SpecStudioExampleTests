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

    def to_json_value(self) -> dict:
        return {
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'AddressTyped':
        return cls(
            _json.as_str(_json.require(m, 'street'), 'street'),
            _json.as_str(_json.require(m, 'city'), 'city'),
            _json.as_str(_json.require(m, 'state'), 'state'),
            _json.as_str(_json.require(m, 'zip'), 'zip')
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
