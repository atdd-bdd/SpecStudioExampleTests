
export class ShoppingCartString {
  constructor(items = "", shipping = "", discount = "", totalPrice = "", shippingAddress = "", billingAddress = "") {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ShoppingCartString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? "",
      v[4] ?? "",
      v[5] ?? ""
    );
  }

  toString() {
    return `Items=${this.items}, Shipping=${this.shipping}, Discount=${this.discount}, TotalPrice=${this.totalPrice}, ShippingAddress=${this.shippingAddress}, BillingAddress=${this.billingAddress}`;
  }
}
