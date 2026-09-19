from . import json_util as _json
from .frame_values_string import FrameValuesString

class FrameValuesTyped:
    def __init__(self, frame: int = 0, roll1: str = '', roll2: str = '', roll3: str = '', score: str = '', total_score: str = ''):
        self.frame = frame
        self.roll1 = roll1
        self.roll2 = roll2
        self.roll3 = roll3
        self.score = score
        self.total_score = total_score

    @classmethod
    def from_string_obj(cls, s: FrameValuesString) -> 'FrameValuesTyped':
        return cls(
            int(s.frame) if s.frame else 0,
            s.roll1,
            s.roll2,
            s.roll3,
            s.score,
            s.total_score
        )

    def to_string_obj(self) -> FrameValuesString:
        return FrameValuesString(
            str(self.frame),
            str(self.roll1),
            str(self.roll2),
            str(self.roll3),
            str(self.score),
            str(self.total_score)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [FrameValuesTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Frame': self.frame,
            'Roll1': self.roll1,
            'Roll2': self.roll2,
            'Roll3': self.roll3,
            'Score': self.score,
            'TotalScore': self.total_score,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'FrameValuesTyped':
        return cls(
            _json.as_int(_json.require(m, 'Frame'), 'Frame'),
            _json.as_str(_json.require(m, 'Roll1'), 'Roll1'),
            _json.as_str(_json.require(m, 'Roll2'), 'Roll2'),
            _json.as_str(_json.require(m, 'Roll3'), 'Roll3'),
            _json.as_str(_json.require(m, 'Score'), 'Score'),
            _json.as_str(_json.require(m, 'TotalScore'), 'TotalScore')
        )

    @classmethod
    def from_json(cls, text: str) -> 'FrameValuesTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'FrameValuesTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Frame={self.frame}' + ', ' +
                f'Roll1={self.roll1}' + ', ' +
                f'Roll2={self.roll2}' + ', ' +
                f'Roll3={self.roll3}' + ', ' +
                f'Score={self.score}' + ', ' +
                f'TotalScore={self.total_score}')

    def _key(self):
        return (self.frame, self.roll1, self.roll2, self.roll3, self.score, self.total_score)

    def __eq__(self, other):
        if not isinstance(other, FrameValuesTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'FrameValuesTyped({self})'
