from .pins_string import PinsString
from production.Pins import Pins

DNC_STRING = '?DNC?'


class PinsTyped:
    """Pins converted: the production value and the text it came from.

    The conversion happens here rather than in a test body. Pins's rule
    is the project's own, and a specification may state a value that rule
    refuses, so whatever it raises belongs on the glue's call -- not on the
    line that builds the table.
    """

    def __init__(self, text: str = ''):
        self.text = '' if text is None else str(text)
        # An empty cell and ?DNC? both state no value, so neither is
        # converted -- a CompareOnly table must be able to say nothing
        # about this column.
        self._value = None
        if self.text and self.text != DNC_STRING:
            self._value = Pins(self.text)

    def has_value(self) -> bool:
        return self._value is not None

    def get(self):
        return self._value

    def to_pins_string(self) -> 'PinsString':
        return PinsString(self.text)

    @staticmethod
    def from_string_list(items) -> list:
        return [PinsTyped(s) for s in items]

    @staticmethod
    def to_string_list(items) -> list:
        return [PinsString(t.text) for t in items]

    def __str__(self):
        return self.text

    def __repr__(self):
        return f'PinsTyped({self.text})'

    def __eq__(self, other):
        if isinstance(other, PinsTyped):
            o = other.text
        elif isinstance(other, str):
            o = str(other)
        else:
            return NotImplemented
        return self.text == o or self.text == DNC_STRING or o == DNC_STRING

    def __hash__(self):
        return hash(self.text)
