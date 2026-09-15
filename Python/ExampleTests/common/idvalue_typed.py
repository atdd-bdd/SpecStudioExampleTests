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

    def to_string_obj(self) -> IDValueString:
        return IDValueString(
            str(self.id),
            str(self.value)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [IDValueTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'ID': self.id,
            'Value': self.value,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'IDValueTyped':
        return cls(
            _json.as_str(_json.require(m, 'ID'), 'ID'),
            _json.as_int(_json.require(m, 'Value'), 'Value')
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

    def __str__(self):
        return (f'ID={self.id}' + ', ' +
                f'Value={self.value}')

    def _key(self):
        return (self.id, self.value)

    def __eq__(self, other):
        if not isinstance(other, IDValueTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'IDValueTyped({self})'
