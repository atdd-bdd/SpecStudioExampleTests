class FilterValueString:
    def __init__(self, value: str = ''):
        self.value = value

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else ''
        )

    def __str__(self):
        return (f'Value={self.value}')
