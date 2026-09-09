import * as tokens from "./tokens.js";

export class ShippingInputString {
  static DNC_STRING = "?DNC?";

  constructor(totalPrice = "", shippingCost = "", notes = "") {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ShippingInputString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 3, "ShippingInput");
    return new ShippingInputString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  toString() {
    return tokens.token(this.totalPrice) + " " + tokens.token(this.shippingCost) + " " + tokens.token(this.notes);
  }

  equals(other) {
    if (!(other instanceof ShippingInputString)) return false;
    return (this.totalPrice === ShippingInputString.DNC_STRING || other.totalPrice === ShippingInputString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.shippingCost === ShippingInputString.DNC_STRING || other.shippingCost === ShippingInputString.DNC_STRING || this.shippingCost === other.shippingCost)
      && (this.notes === ShippingInputString.DNC_STRING || other.notes === ShippingInputString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
