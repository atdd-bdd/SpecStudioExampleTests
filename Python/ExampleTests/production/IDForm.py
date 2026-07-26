class IDForm:
    """Exactly five characters, beginning with Q."""

    def __init__(self, value):
        self.value = value if value is not None else ''
        if not (len(self.value) == 5 and self.value.startswith('Q')):
            raise ValueError('Must be 5 characters starting with Q')

    def __eq__(self, other):
        if not isinstance(other, IDForm):
            return NotImplemented
        return self.value == other.value

    def __hash__(self):
        return hash(self.value)

    def __str__(self):
        return f'IDForm{{{self.value}}}'
