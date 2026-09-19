from . import tokens
DNC_STRING = '?DNC?'


class NewPostString:
    def __init__(self, title: str = '', body: str = '', user_id: str = ''):
        self.title = title
        self.body = body
        self.user_id = user_id

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 3, 'NewPost')
        return cls(
            parts[0],
            parts[1],
            parts[2]
        )

    def __str__(self):
        return (tokens.token(self.title) + ' ' +
                tokens.token(self.body) + ' ' +
                tokens.token(self.user_id))

    def _key(self):
        return (self.title, self.body, self.user_id)

    def __eq__(self, other):
        if not isinstance(other, NewPostString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'NewPostString({self})'
