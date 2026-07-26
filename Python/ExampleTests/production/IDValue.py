from .IDForm import IDForm


class IDValue:
    def __init__(self, id: IDForm, value: int):
        self.id = id
        self.value = value

    def __eq__(self, other):
        if not isinstance(other, IDValue):
            return NotImplemented
        return self.id == other.id and self.value == other.value

    def __hash__(self):
        return hash((self.id, self.value))

    def __str__(self):
        return f'IDValue{{{self.id}, {self.value}}}'
