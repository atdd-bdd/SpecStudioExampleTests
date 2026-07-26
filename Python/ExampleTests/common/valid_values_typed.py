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

    def to_json_value(self) -> dict:
        return {
            'value': self.value,
            'is_valid': self.is_valid,
            'notes': self.notes,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ValidValuesTyped':
        return cls(
            _json.as_str(_json.require(m, 'value'), 'value'),
            _json.as_bool(_json.require(m, 'is_valid'), 'is_valid'),
            _json.as_str(_json.require(m, 'notes'), 'notes')
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
