class ValidValuesString:
    def __init__(self, value: str = '', is_valid: str = '', notes: str = ''):
        self.value = value
        self.is_valid = is_valid
        self.notes = notes

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else '',
            v[2] if len(v) > 2 else ''
        )

    def __str__(self):
        return (f'Value={self.value}' + ', ' +
                f'IsValid={self.is_valid}' + ', ' +
                f'Notes={self.notes}')
