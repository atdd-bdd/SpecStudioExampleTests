import decimal


class Percentage:
    """A percentage from 0 to 100 inclusive."""

    def __init__(self, value):
        text = str(value if value is not None else '').replace('%', '').strip()
        try:
            self.amount = decimal.Decimal(text) if text else decimal.Decimal(0)
        except decimal.InvalidOperation as e:
            raise ValueError(f'Not a number: {value}') from e
        if self.amount < 0 or self.amount > 100:
            raise ValueError(f'Percentage must be between 0 and 100: {value}')

    def to_decimal(self) -> decimal.Decimal:
        return self.amount

    def __eq__(self, other):
        if not isinstance(other, Percentage):
            return NotImplemented
        return self.amount == other.amount

    def __hash__(self):
        return hash(self.amount)

    def __str__(self):
        return f'Percentage{{{self.amount}}}'
