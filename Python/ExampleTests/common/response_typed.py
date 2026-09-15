from . import json_util as _json
from .response_string import ResponseString
from .result_typed import ResultTyped

class ResponseTyped:
    def __init__(self, result: 'ResultTyped' = None):
        self.result = result

    @classmethod
    def from_string_obj(cls, s: ResponseString) -> 'ResponseTyped':
        return cls(
            ResultTyped.from_string_obj(s.result)
        )

    def to_string_obj(self) -> ResponseString:
        return ResponseString(
            self.result.to_string_obj()
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [ResponseTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'result': self.result.to_json_value() if self.result else None,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ResponseTyped':
        return cls(
            ResultTyped.from_json_value(_json.require(m, 'result'))
        )

    @classmethod
    def from_json(cls, text: str) -> 'ResponseTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ResponseTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'result={self.result}')

    def _key(self):
        return (self.result,)

    def __eq__(self, other):
        if not isinstance(other, ResponseTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ResponseTyped({self})'
