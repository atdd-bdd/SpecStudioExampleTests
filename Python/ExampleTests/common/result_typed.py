from . import json_util as _json
from .result_string import ResultString
from .match__typed import MatchTyped

class ResultTyped:
    def __init__(self, address_matches: list = None):
        self.address_matches = address_matches if address_matches is not None else []

    @classmethod
    def from_string_obj(cls, s: ResultString) -> 'ResultTyped':
        return cls(
            []
        )

    def to_string_obj(self) -> ResultString:
        return ResultString(
            ''
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [ResultTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'addressMatches': [e.to_json_value() for e in self.address_matches],
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ResultTyped':
        return cls(
            [MatchTyped.from_json_value(e) for e in _json.as_list(_json.require(m, 'addressMatches'), 'addressMatches')]
        )

    @classmethod
    def from_json(cls, text: str) -> 'ResultTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ResultTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'addressMatches={self.address_matches}')

    def _key(self):
        return (self.address_matches,)

    def __eq__(self, other):
        if not isinstance(other, ResultTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ResultTyped({self})'
