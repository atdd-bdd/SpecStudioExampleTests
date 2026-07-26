from . import json_util as _json
from .adder_string import AdderString

class AdderTyped:
    def __init__(self, number1: int = 0, number2: int = 0, result: int = 0):
        self.number1 = number1
        self.number2 = number2
        self.result = result

    @classmethod
    def from_string_obj(cls, s: AdderString) -> 'AdderTyped':
        return cls(
            int(s.number1) if s.number1 else 0,
            int(s.number2) if s.number2 else 0,
            int(s.result) if s.result else 0
        )

    def to_json_value(self) -> dict:
        return {
            'number1': self.number1,
            'number2': self.number2,
            'result': self.result,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'AdderTyped':
        return cls(
            _json.as_int(_json.require(m, 'number1'), 'number1'),
            _json.as_int(_json.require(m, 'number2'), 'number2'),
            _json.as_int(_json.require(m, 'result'), 'result')
        )

    @classmethod
    def from_json(cls, text: str) -> 'AdderTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'AdderTyped')
        return [cls.from_json_value(e) for e in raw]
