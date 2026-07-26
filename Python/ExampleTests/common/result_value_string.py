class ResultValueString:
    def __init__(self, sum: str = ''):
        self.sum = sum

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else ''
        )

    def __str__(self):
        return (f'Sum={self.sum}')
