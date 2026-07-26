export class ShoppingCart {
  items: OrderItemCollection;
  shipping: Dollar;
  discount: Dollar;
  totalPrice: Dollar;
  shippingAddress: Address;
  billingAddress: Address;

  constructor(items: OrderItemCollection = =EmptyCart, shipping: Dollar = $0, discount: Dollar = $0, totalPrice: Dollar = $0, shippingAddress: Address = =NoAddress, billingAddress: Address = =NoAddress) {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }
}
