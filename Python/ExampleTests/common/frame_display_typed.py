from . import json_util as _json
from .frame_display_string import FrameDisplayString

class FrameDisplayTyped:
    def __init__(self, frame: str = '', mark1: str = '', mark2: str = '', mark3: str = '', total_score: str = ''):
        self.frame = frame
        self.mark1 = mark1
        self.mark2 = mark2
        self.mark3 = mark3
        self.total_score = total_score

    @classmethod
    def from_string_obj(cls, s: FrameDisplayString) -> 'FrameDisplayTyped':
        return cls(
            s.frame,
            s.mark1,
            s.mark2,
            s.mark3,
            s.total_score
        )

    def to_string_obj(self) -> FrameDisplayString:
        return FrameDisplayString(
            str(self.frame),
            str(self.mark1),
            str(self.mark2),
            str(self.mark3),
            str(self.total_score)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [FrameDisplayTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Frame': self.frame,
            'Mark1': self.mark1,
            'Mark2': self.mark2,
            'Mark3': self.mark3,
            'TotalScore': self.total_score,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'FrameDisplayTyped':
        return cls(
            _json.as_str(_json.require(m, 'Frame'), 'Frame'),
            _json.as_str(_json.require(m, 'Mark1'), 'Mark1'),
            _json.as_str(_json.require(m, 'Mark2'), 'Mark2'),
            _json.as_str(_json.require(m, 'Mark3'), 'Mark3'),
            _json.as_str(_json.require(m, 'TotalScore'), 'TotalScore')
        )

    @classmethod
    def from_json(cls, text: str) -> 'FrameDisplayTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'FrameDisplayTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Frame={self.frame}' + ', ' +
                f'Mark1={self.mark1}' + ', ' +
                f'Mark2={self.mark2}' + ', ' +
                f'Mark3={self.mark3}' + ', ' +
                f'TotalScore={self.total_score}')

    def _key(self):
        return (self.frame, self.mark1, self.mark2, self.mark3, self.total_score)

    def __eq__(self, other):
        if not isinstance(other, FrameDisplayTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'FrameDisplayTyped({self})'
