from . import json_util as _json
from .idvalue_string import IDValueString

class IDValueTyped:
    def __init__(self, id: str = '', value: int = 0):
        self.id = id
        self.value = value

    @classmethod
    def from_string_obj(cls, s: IDValueString) -> 'IDValueTyped':
        return cls(
            s.id,
            int(s.value) if s.value else 0
        )

    def to_json_value(self) -> dict:
        return {
            'id': self.id,
            'value': self.value,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'IDValueTyped':
        return cls(
            _json.as_str(_json.require(m, 'id'), 'id'),
            _json.as_int(_json.require(m, 'value'), 'value')
        )

    @classmethod
    def from_json(cls, text: str) -> 'IDValueTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'IDValueTyped')
        return [cls.from_json_value(e) for e in raw]
