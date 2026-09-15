from . import json_util as _json
from .request_string import RequestString

class RequestTyped:
    def __init__(self, method: str = '', page: str = '', address: str = '', benchmark: str = '', format: str = ''):
        self.method = method
        self.page = page
        self.address = address
        self.benchmark = benchmark
        self.format = format

    @classmethod
    def from_string_obj(cls, s: RequestString) -> 'RequestTyped':
        return cls(
            s.method,
            s.page,
            s.address,
            s.benchmark,
            s.format
        )

    def to_string_obj(self) -> RequestString:
        return RequestString(
            str(self.method),
            str(self.page),
            str(self.address),
            str(self.benchmark),
            str(self.format)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [RequestTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Method': self.method,
            'Page': self.page,
            'Address': self.address,
            'Benchmark': self.benchmark,
            'Format': self.format,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'RequestTyped':
        return cls(
            _json.as_str(_json.require(m, 'Method'), 'Method'),
            _json.as_str(_json.require(m, 'Page'), 'Page'),
            _json.as_str(_json.require(m, 'Address'), 'Address'),
            _json.as_str(_json.require(m, 'Benchmark'), 'Benchmark'),
            _json.as_str(_json.require(m, 'Format'), 'Format')
        )

    @classmethod
    def from_json(cls, text: str) -> 'RequestTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'RequestTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Method={self.method}' + ', ' +
                f'Page={self.page}' + ', ' +
                f'Address={self.address}' + ', ' +
                f'Benchmark={self.benchmark}' + ', ' +
                f'Format={self.format}')

    def _key(self):
        return (self.method, self.page, self.address, self.benchmark, self.format)

    def __eq__(self, other):
        if not isinstance(other, RequestTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'RequestTyped({self})'
