export class ShoppingCart {
  constructor(items = =EmptyCart, shipping = $0, discount = $0, totalPrice = $0, shippingAddress = =NoAddress, billingAddress = =NoAddress) {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }
}
