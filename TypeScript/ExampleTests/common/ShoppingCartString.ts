
export class ShoppingCartString {
  items: string;
  shipping: string;
  discount: string;
  totalPrice: string;
  shippingAddress: string;
  billingAddress: string;

  constructor(items: string = "", shipping: string = "", discount: string = "", totalPrice: string = "", shippingAddress: string = "", billingAddress: string = "") {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromList(values: Iterable<string>): ShoppingCartString {
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

  toString(): string {
    return `Items=${this.items}, Shipping=${this.shipping}, Discount=${this.discount}, TotalPrice=${this.totalPrice}, ShippingAddress=${this.shippingAddress}, BillingAddress=${this.billingAddress}`;
  }
}
