class PricingString:
    def __init__(self, total_price: str = ''):
        self.total_price = total_price

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else ''
        )

    def __str__(self):
        return (f'TotalPrice={self.total_price}')
