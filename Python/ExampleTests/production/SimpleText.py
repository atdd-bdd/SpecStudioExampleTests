import re

_PATTERN = re.compile(r'[ a-zA-Z0-9,.\-]*')


class SimpleText:
    """Alphabetic, numeric, space, hyphen, period, comma — nothing else."""

    def __init__(self, value):
        self.value = value if value is not None else ''
        if not _PATTERN.fullmatch(self.value):
            raise ValueError(f'Invalid SimpleText: {self.value}')

    def __eq__(self, other):
        if not isinstance(other, SimpleText):
            return NotImplemented
        return self.value == other.value

    def __hash__(self):
        return hash(self.value)

    def __str__(self):
        return self.value
