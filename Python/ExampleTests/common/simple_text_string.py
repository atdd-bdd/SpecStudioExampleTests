# SimpleText as a table cell holds it: the unconverted text.
#
# This is a str, so a cell read as text before still compares, strips and
# formats the way it always did. The class exists so that a generated
# signature names the DataType the specification declared.


class SimpleTextString(str):
    def __new__(cls, value: str = ''):
        return super().__new__(cls, '' if value is None else str(value))

    @property
    def value(self) -> str:
        return str(self)

    @classmethod
    def from_text(cls, text: str) -> 'SimpleTextString':
        return cls(text)
