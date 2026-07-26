from . import json_util as _json
from .fand_c_string import FandCString

class FandCTyped:
    def __init__(self, f: int = 0, c: int = 0, notes: str = ''):
        self.f = f
        self.c = c
        self.notes = notes

    @classmethod
    def from_string_obj(cls, s: FandCString) -> 'FandCTyped':
        return cls(
            int(s.f) if s.f else 0,
            int(s.c) if s.c else 0,
            s.notes
        )

    def to_json_value(self) -> dict:
        return {
            'f': self.f,
            'c': self.c,
            'notes': self.notes,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'FandCTyped':
        return cls(
            _json.as_int(_json.require(m, 'f'), 'f'),
            _json.as_int(_json.require(m, 'c'), 'c'),
            _json.as_str(_json.require(m, 'notes'), 'notes')
        )

    @classmethod
    def from_json(cls, text: str) -> 'FandCTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'FandCTyped')
        return [cls.from_json_value(e) for e in raw]
