from . import json_util as _json
from .result_value_string import ResultValueString

class ResultValueTyped:
    def __init__(self, sum: int = 0):
        self.sum = sum

    @classmethod
    def from_string_obj(cls, s: ResultValueString) -> 'ResultValueTyped':
        return cls(
            int(s.sum) if s.sum else 0
        )

    def to_json_value(self) -> dict:
        return {
            'sum': self.sum,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ResultValueTyped':
        return cls(
            _json.as_int(_json.require(m, 'sum'), 'sum')
        )

    @classmethod
    def from_json(cls, text: str) -> 'ResultValueTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ResultValueTyped')
        return [cls.from_json_value(e) for e in raw]
