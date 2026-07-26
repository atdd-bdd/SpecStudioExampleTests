class IDValueString:
    def __init__(self, id: str = '', value: str = ''):
        self.id = id
        self.value = value

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else ''
        )

    def __str__(self):
        return (f'ID={self.id}' + ', ' +
                f'Value={self.value}')
