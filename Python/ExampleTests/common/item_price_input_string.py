from . import tokens
DNC_STRING = '?DNC?'


class ItemPriceInputString:
    def __init__(self, total_items: str = ''):
        self.total_items = total_items

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else ''
        )

    @classmethod
    def from_text(cls, text):
        """Builds from the text form, e.g. Money as '25 USD'."""
        parts = tokens.require(text, 1, 'ItemPriceInput')
        return cls(
            parts[0]
        )

    def __str__(self):
        return (tokens.token(self.total_items))

    def _key(self):
        return (self.total_items,)

    def __eq__(self, other):
        if not isinstance(other, ItemPriceInputString):
            return NotImplemented
        return all(a == b or a == DNC_STRING or b == DNC_STRING
                   for a, b in zip(self._key(), other._key()))

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'ItemPriceInputString({self})'
