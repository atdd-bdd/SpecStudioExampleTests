from . import json_util as _json
from .valid_values_string import ValidValuesString

class ValidValuesTyped:
    def __init__(self, value: str = '', is_valid: bool = False, notes: str = ''):
        self.value = value
        self.is_valid = is_valid
        self.notes = notes

    @classmethod
    def from_string_obj(cls, s: ValidValuesString) -> 'ValidValuesTyped':
        return cls(
            s.value,
            s.is_valid.lower() in ('true', 't', 'yes', 'y', '1'),
            s.notes
        )

    def to_string_obj(self) -> ValidValuesString:
        return ValidValuesString(
            str(self.value),
            str(self.is_valid),
            str(self.notes)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [ValidValuesTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Value': self.value,
            'IsValid': self.is_valid,
            'Notes': self.notes,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ValidValuesTyped':
        return cls(
            _json.as_str(_json.require(m, 'Value'), 'Value'),
            _json.as_bool(_json.require(m, 'IsValid'), 'IsValid'),
            _json.as_str(_json.require(m, 'Notes'), 'Notes')
        )

    @classmethod
    def from_json(cls, text: str) -> 'ValidValuesTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ValidValuesTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Value={self.value}' + ', ' +
                f'IsValid={self.is_valid}' + ', ' +
                f'Notes={self.notes}')

    def _key(self):
        return (self.value, self.is_valid, self.notes)

    def __eq__(self, other):
        if not isinstance(other, ValidValuesTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ValidValuesTyped({self})'
