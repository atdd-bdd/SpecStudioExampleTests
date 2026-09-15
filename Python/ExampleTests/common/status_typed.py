from . import json_util as _json
from .status_string import StatusString

class StatusTyped:
    def __init__(self, code: int = 0):
        self.code = code

    @classmethod
    def from_string_obj(cls, s: StatusString) -> 'StatusTyped':
        return cls(
            int(s.code) if s.code else 0
        )

    def to_string_obj(self) -> StatusString:
        return StatusString(
            str(self.code)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [StatusTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Code': self.code,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'StatusTyped':
        return cls(
            _json.as_int(_json.require(m, 'Code'), 'Code')
        )

    @classmethod
    def from_json(cls, text: str) -> 'StatusTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'StatusTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Code={self.code}')

    def _key(self):
        return (self.code,)

    def __eq__(self, other):
        if not isinstance(other, StatusTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'StatusTyped({self})'
