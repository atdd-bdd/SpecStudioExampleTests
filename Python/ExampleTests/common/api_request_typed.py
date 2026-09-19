from . import json_util as _json
from .api_request_string import ApiRequestString

class ApiRequestTyped:
    def __init__(self, method: str = '', page: str = '', parameter: str = '', body: str = ''):
        self.method = method
        self.page = page
        self.parameter = parameter
        self.body = body

    @classmethod
    def from_string_obj(cls, s: ApiRequestString) -> 'ApiRequestTyped':
        return cls(
            s.method,
            s.page,
            s.parameter,
            s.body
        )

    def to_string_obj(self) -> ApiRequestString:
        return ApiRequestString(
            str(self.method),
            str(self.page),
            str(self.parameter),
            str(self.body)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [ApiRequestTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Method': self.method,
            'Page': self.page,
            'Parameter': self.parameter,
            'Body': self.body,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'ApiRequestTyped':
        return cls(
            _json.as_str(_json.require(m, 'Method'), 'Method'),
            _json.as_str(_json.require(m, 'Page'), 'Page'),
            _json.as_str(_json.require(m, 'Parameter'), 'Parameter'),
            _json.as_str(_json.require(m, 'Body'), 'Body')
        )

    @classmethod
    def from_json(cls, text: str) -> 'ApiRequestTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'ApiRequestTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Method={self.method}' + ', ' +
                f'Page={self.page}' + ', ' +
                f'Parameter={self.parameter}' + ', ' +
                f'Body={self.body}')

    def _key(self):
        return (self.method, self.page, self.parameter, self.body)

    def __eq__(self, other):
        if not isinstance(other, ApiRequestTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ApiRequestTyped({self})'
