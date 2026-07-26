class CatalogItemString:
    def __init__(self, name: str = '', price: str = ''):
        self.name = name
        self.price = price

    @classmethod
    def from_list(cls, values):
        v = list(values)
        return cls(
            v[0] if len(v) > 0 else '',
            v[1] if len(v) > 1 else ''
        )

    def __str__(self):
        return (f'Name={self.name}' + ', ' +
                f'Price={self.price}')
