class ShoppingCart:
    def __init__(self, items: str = =EmptyCart, shipping: str = $0, discount: str = $0, total_price: str = $0, shipping_address: str = =NoAddress, billing_address: str = =NoAddress):
        self.items = items
        self.shipping = shipping
        self.discount = discount
        self.total_price = total_price
        self.shipping_address = shipping_address
        self.billing_address = billing_address
