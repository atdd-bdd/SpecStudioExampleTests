import decimal


class Dollar:
    """A monetary amount: never negative, never finer than a cent."""

    def __init__(self, value):
        text = str(value if value is not None else '').replace('$', '').strip()
        if text == '':
            self.amount = decimal.Decimal(0)
        else:
            try:
                self.amount = decimal.Decimal(text)
            except decimal.InvalidOperation as e:
                raise ValueError(f'Not a number: {value}') from e
        if self.amount < 0:
            raise ValueError(f'Dollar amount cannot be negative: {value}')
        if -self.amount.as_tuple().exponent > 2:
            raise ValueError(
                f'Dollar amount must not have more than two decimal digits: {value}')

    def plus(self, other: 'Dollar') -> 'Dollar':
        return Dollar(self.amount + other.amount)

    def minus(self, other: 'Dollar') -> 'Dollar':
        return Dollar(self.amount - other.amount)

    def times(self, factor: int) -> 'Dollar':
        return Dollar(self.amount * factor)

    def percent_of(self, percentage) -> 'Dollar':
        """The given percentage of this amount, rounded to the nearest cent."""
        raw = self.amount * percentage.to_decimal() / decimal.Decimal(100)
        return Dollar(raw.quantize(decimal.Decimal('0.01'),
                                   rounding=decimal.ROUND_HALF_UP))

    def to_decimal(self) -> decimal.Decimal:
        return self.amount

    def __eq__(self, other):
        if not isinstance(other, Dollar):
            return NotImplemented
        return self.amount == other.amount

    def __hash__(self):
        return hash(self.amount)

    def __str__(self):
        return f'Dollar{{{self.amount}}}'
