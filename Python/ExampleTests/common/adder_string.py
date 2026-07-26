class AdderString:
    def __init__(self, number1: str = '', number2: str = '', result: str = ''):
        self.number1 = number1
        self.number2 = number2
        self.result = result

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else ''
        )

    def __str__(self):
        return (f'number1={self.number1}' + ', ' +
                f'number2={self.number2}' + ', ' +
                f'result={self.result}')
