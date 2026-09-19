from . import tokens
DNC_STRING = '?DNC?'


class ApiRequestString:
    def __init__(self, method: str = '', page: str = '', parameter: str = '', body: str = ''):
        self.method = method
        self.page = page
        self.parameter = parameter
        self.body = body

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else '',
            v[3] if len(v) > 3 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 4, 'ApiRequest')
        return cls(
            parts[0],
            parts[1],
            parts[2],
            parts[3]
        )

    def __str__(self):
        return (tokens.token(self.method) + ' ' +
                tokens.token(self.page) + ' ' +
                tokens.token(self.parameter) + ' ' +
                tokens.token(self.body))

    def _key(self):
        return (self.method, self.page, self.parameter, self.body)

    def __eq__(self, other):
        if not isinstance(other, ApiRequestString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ApiRequestString({self})'
