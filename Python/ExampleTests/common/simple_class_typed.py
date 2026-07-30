from . import json_util as _json
from .simple_class_string import SimpleClassString

class SimpleClassTyped:
    def __init__(self, an_int: int = 0, a_string: str = ''):
        self.an_int = an_int
        self.a_string = a_string

    @classmethod
    def from_string_obj(cls, s: SimpleClassString) -> 'SimpleClassTyped':
        return cls(
            int(s.an_int) if s.an_int else 0,
            s.a_string
        )

    def to_json_value(self) -> dict:
        return {
            'an_int': self.an_int,
            'a_string': self.a_string,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'SimpleClassTyped':
        return cls(
            _json.as_int(_json.require(m, 'an_int'), 'an_int'),
            _json.as_str(_json.require(m, 'a_string'), 'a_string')
        )

    @classmethod
    def from_json(cls, text: str) -> 'SimpleClassTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'SimpleClassTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'anInt={self.an_int}' + ', ' +
                f'aString={self.a_string}')

    def _key(self):
        return (self.an_int, self.a_string)

    def __eq__(self, other):
        if not isinstance(other, SimpleClassTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'SimpleClassTyped({self})'
