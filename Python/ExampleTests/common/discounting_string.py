class DiscountingString:
    def __init__(self, total_price: str = '', discount: str = '', notes: str = ''):
        self.total_price = total_price
        self.discount = discount
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
        return (f'Total Price={self.total_price}' + ', ' +
                f'Discount={self.discount}' + ', ' +
                f'Notes={self.notes}')
