from . import json_util as _json
from .input_control_values_string import InputControlValuesString

class InputControlValuesTyped:
    def __init__(self, frame: int = 0, roll: str = '', remaining: str = ''):
        self.frame = frame
        self.roll = roll
        self.remaining = remaining

    @classmethod
    def from_string_obj(cls, s: InputControlValuesString) -> 'InputControlValuesTyped':
        return cls(
            int(s.frame) if s.frame else 0,
            s.roll,
            s.remaining
        )

    def to_string_obj(self) -> InputControlValuesString:
        return InputControlValuesString(
            str(self.frame),
            str(self.roll),
            str(self.remaining)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [InputControlValuesTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Frame': self.frame,
            'Roll': self.roll,
            'Remaining': self.remaining,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'InputControlValuesTyped':
        return cls(
            _json.as_int(_json.require(m, 'Frame'), 'Frame'),
            _json.as_str(_json.require(m, 'Roll'), 'Roll'),
            _json.as_str(_json.require(m, 'Remaining'), 'Remaining')
        )

    @classmethod
    def from_json(cls, text: str) -> 'InputControlValuesTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'InputControlValuesTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Frame={self.frame}' + ', ' +
                f'Roll={self.roll}' + ', ' +
                f'Remaining={self.remaining}')

    def _key(self):
        return (self.frame, self.roll, self.remaining)

    def __eq__(self, other):
        if not isinstance(other, InputControlValuesTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'InputControlValuesTyped({self})'
