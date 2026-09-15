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

    def to_string_obj(self) -> FandCString:
        return FandCString(
            str(self.f),
            str(self.c),
            str(self.notes)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [FandCTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'F': self.f,
            'C': self.c,
            'Notes': self.notes,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'FandCTyped':
        return cls(
            _json.as_int(_json.require(m, 'F'), 'F'),
            _json.as_int(_json.require(m, 'C'), 'C'),
            _json.as_str(_json.require(m, 'Notes'), 'Notes')
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

    def __str__(self):
        return (f'F={self.f}' + ', ' +
                f'C={self.c}' + ', ' +
                f'Notes={self.notes}')

    def _key(self):
        return (self.f, self.c, self.notes)

    def __eq__(self, other):
        if not isinstance(other, FandCTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'FandCTyped({self})'
