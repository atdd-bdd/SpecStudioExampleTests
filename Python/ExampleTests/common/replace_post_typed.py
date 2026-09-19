from . import json_util as _json
from .replace_post_string import ReplacePostString

class ReplacePostTyped:
    def __init__(self, id: int = 0, user_id: int = 0, title: str = '', body: str = ''):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.body = body

    @classmethod
    def from_string_obj(cls, s: ReplacePostString) -> 'ReplacePostTyped':
        return cls(
            int(s.id) if s.id else 0,
            int(s.user_id) if s.user_id else 0,
            s.title,
            s.body
        )

    def to_string_obj(self) -> ReplacePostString:
        return ReplacePostString(
            str(self.id),
            str(self.user_id),
            str(self.title),
            str(self.body)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [ReplacePostTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'body': self.body,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ReplacePostTyped':
        return cls(
            _json.as_int(_json.require(m, 'id'), 'id'),
            _json.as_int(_json.require(m, 'userId'), 'userId'),
            _json.as_str(_json.require(m, 'title'), 'title'),
            _json.as_str(_json.require(m, 'body'), 'body')
        )

    @classmethod
    def from_json(cls, text: str) -> 'ReplacePostTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ReplacePostTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'id={self.id}' + ', ' +
                f'userId={self.user_id}' + ', ' +
                f'title={self.title}' + ', ' +
                f'body={self.body}')

    def _key(self):
        return (self.id, self.user_id, self.title, self.body)

    def __eq__(self, other):
        if not isinstance(other, ReplacePostTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ReplacePostTyped({self})'
