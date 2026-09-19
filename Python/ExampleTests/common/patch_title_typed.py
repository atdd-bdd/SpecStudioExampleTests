from . import json_util as _json
from .patch_title_string import PatchTitleString

class PatchTitleTyped:
    def __init__(self, title: str = ''):
        self.title = title

    @classmethod
    def from_string_obj(cls, s: PatchTitleString) -> 'PatchTitleTyped':
        return cls(
            s.title
        )

    def to_string_obj(self) -> PatchTitleString:
        return PatchTitleString(
            str(self.title)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [PatchTitleTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'title': self.title,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'PatchTitleTyped':
        return cls(
            _json.as_str(_json.require(m, 'title'), 'title')
        )

    @classmethod
    def from_json(cls, text: str) -> 'PatchTitleTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'PatchTitleTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'title={self.title}')

    def _key(self):
        return (self.title,)

    def __eq__(self, other):
        if not isinstance(other, PatchTitleTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'PatchTitleTyped({self})'
