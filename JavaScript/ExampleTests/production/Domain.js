import { Dollar, IDForm, Percentage, SimpleText } from "./DataTypes.js";

// The entities and collections the Shopping Cart and Record Filter
// specifications describe.

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

export class IDValue {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

/** Holds IDValue records and sums the ones carrying a given ID. */
export class RecordFilter {
  constructor() { this.entries = []; }

  add(entry) { this.entries.push(entry); }

  sumByLabel(filterLabel) {
    return this.entries
      .filter((e) => e.id.equals(filterLabel))
      .reduce((sum, e) => sum + e.value, 0);
  }
}

/** Truncates toward zero, so -40F comes out -40C. */
export function fahrenheitToCelsius(fahrenheit) {
  return Math.trunc(((fahrenheit - 32) * 5) / 9);
}

export class Calculator {
  add(a, b) { return a + b; }
}

// ---------------------------------------------------------------------------
// Shopping
// ---------------------------------------------------------------------------

export class Address {
  constructor(street, city, state, zip) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}

export class CatalogItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

export const CATALOG_MINIMUM = 0;
export const CATALOG_MAXIMUM = 10000000;

/** The items on offer, each with the price an order line is charged. */
export class Catalog {
  constructor() { this.items = []; }

  add(item) { this.items.push(item); }
  read() { return [...this.items]; }
  get size() { return this.items.length; }

  priceFor(name) {
    const found = this.items.find((i) => i.name.equals(name));
    return found ? found.price : null;
  }
}

export class OrderItem {
  constructor(name, quantity, price, itemTotal) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }

  static create(name, quantity, price) {
    return new OrderItem(name, quantity, price, price.times(quantity));
  }

  /** Looks the price up rather than being told it. */
  static fromCatalog(catalog, name, quantity) {
    const price = catalog.priceFor(name);
    return price === null ? null : OrderItem.create(name, quantity, price);
  }
}

export const ORDER_ITEM_COLLECTION_MINIMUM = 0;
export const ORDER_ITEM_COLLECTION_MAXIMUM = 100;

export class OrderItemCollection {
  constructor() { this.items = []; }

  add(item) { this.items.push(item); }
  read() { return [...this.items]; }
  get size() { return this.items.length; }

  computeTotal() {
    return this.items.reduce((acc, i) => acc.plus(i.itemTotal), new Dollar(0));
  }
}

export class ShoppingCart {
  constructor(items, shippingAddress = null, billingAddress = null) {
    this.items = items;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  // --- the two business rules ---------------------------------------------

  /** Free once the order reaches $100, otherwise a flat $5. */
  static shippingCostFor(totalPrice) {
    return totalPrice.cents >= 10000 ? new Dollar(0) : new Dollar(500);
  }

  /** Tiered: under $25 nothing, to $99.99 five percent, $100 up ten. */
  static discountFor(totalPrice) {
    if (totalPrice.cents >= 10000) return new Percentage(10);
    if (totalPrice.cents >= 2500) return new Percentage(5);
    return new Percentage(0);
  }

  // --- what the cart comes to ---------------------------------------------

  /** What the items come to before any discount or shipping. */
  subtotal() { return this.items.computeTotal(); }

  /** The discount as money: the tiered percentage of the subtotal. */
  discountAmount() {
    const amount = this.subtotal();
    return amount.percentOf(ShoppingCart.discountFor(amount));
  }

  /**
   * Shipping is charged on what the customer actually pays, so the discount
   * comes off before the $100 threshold is tested — following the scenario's
   * "Apply Discount to OrderItem Total, then add shipping".
   */
  shippingCost() {
    return ShoppingCart.shippingCostFor(this.subtotal().minus(this.discountAmount()));
  }

  /** Subtotal, less the discount, plus shipping. */
  computeTotal() {
    return this.subtotal().minus(this.discountAmount()).plus(this.shippingCost());
  }
}
