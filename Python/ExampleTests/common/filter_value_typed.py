from . import json_util as _json
from .filter_value_string import FilterValueString

class FilterValueTyped:
    def __init__(self, value: str = ''):
        self.value = value

    @classmethod
    def from_string_obj(cls, s: FilterValueString) -> 'FilterValueTyped':
        return cls(
            s.value
        )

    def to_json_value(self) -> dict:
        return {
            'value': self.value,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'FilterValueTyped':
        return cls(
            _json.as_str(_json.require(m, 'value'), 'value')
        )

    @classmethod
    def from_json(cls, text: str) -> 'FilterValueTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'FilterValueTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Value={self.value}')

    def _key(self):
        return (self.value,)

    def __eq__(self, other):
        if not isinstance(other, FilterValueTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'FilterValueTyped({self})'
