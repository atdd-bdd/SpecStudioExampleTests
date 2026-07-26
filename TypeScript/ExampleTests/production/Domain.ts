import { Dollar, IDForm, Percentage, SimpleText } from "./DataTypes.js";

// The entities and collections the Shopping Cart and Record Filter
// specifications describe.

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

export class IDValue {
  readonly id: IDForm;
  readonly value: number;

  constructor(id: IDForm, value: number) {
    this.id = id;
    this.value = value;
  }
}

/** Holds IDValue records and sums the ones carrying a given ID. */
export class RecordFilter {
  private entries: IDValue[] = [];

  constructor() { this.entries = []; }

  add(entry: IDValue): void { this.entries.push(entry); }

  sumByLabel(filterLabel: IDForm): number {
    return this.entries
      .filter((e) => e.id.equals(filterLabel))
      .reduce((sum, e) => sum + e.value, 0);
  }
}

/** Truncates toward zero, so -40F comes out -40C. */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.trunc(((fahrenheit - 32) * 5) / 9);
}

export class Calculator {
  add(a: number, b: number): number { return a + b; }
}

// ---------------------------------------------------------------------------
// Shopping
// ---------------------------------------------------------------------------

export class Address {
  readonly street: SimpleText;
  readonly city: SimpleText;
  readonly state: SimpleText;
  readonly zip: SimpleText;

  constructor(street: SimpleText, city: SimpleText, state: SimpleText, zip: SimpleText) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}

export class CatalogItem {
  readonly name: SimpleText;
  readonly price: Dollar;

  constructor(name: SimpleText, price: Dollar) {
    this.name = name;
    this.price = price;
  }
}

export const CATALOG_MINIMUM = 0;
export const CATALOG_MAXIMUM = 10000000;

/** The items on offer, each with the price an order line is charged. */
export class Catalog {
  private items: CatalogItem[] = [];

  constructor() { this.items = []; }

  add(item: CatalogItem): void { this.items.push(item); }
  read(): CatalogItem[] { return [...this.items]; }
  get size(): number { return this.items.length; }

  priceFor(name: SimpleText): Dollar | null {
    const found = this.items.find((i) => i.name.equals(name));
    return found ? found.price : null;
  }
}

export class OrderItem {
  readonly name: SimpleText;
  readonly quantity: number;
  readonly price: Dollar;
  readonly itemTotal: Dollar;

  constructor(name: SimpleText, quantity: number, price: Dollar, itemTotal: Dollar) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }

  static create(name: SimpleText, quantity: number, price: Dollar): OrderItem {
    return new OrderItem(name, quantity, price, price.times(quantity));
  }

  /** Looks the price up rather than being told it. */
  static fromCatalog(catalog: Catalog, name: SimpleText, quantity: number): OrderItem | null {
    const price = catalog.priceFor(name);
    return price === null ? null : OrderItem.create(name, quantity, price);
  }
}

export const ORDER_ITEM_COLLECTION_MINIMUM = 0;
export const ORDER_ITEM_COLLECTION_MAXIMUM = 100;

export class OrderItemCollection {
  private items: OrderItem[] = [];

  constructor() { this.items = []; }

  add(item: OrderItem): void { this.items.push(item); }
  read(): OrderItem[] { return [...this.items]; }
  get size(): number { return this.items.length; }

  computeTotal(): Dollar {
    return this.items.reduce((acc, i) => acc.plus(i.itemTotal), new Dollar(0));
  }
}

export class ShoppingCart {
  readonly items: OrderItemCollection;
  readonly shippingAddress: Address | null;
  readonly billingAddress: Address | null;

  constructor(items: OrderItemCollection, shippingAddress: Address | null = null, billingAddress: Address | null = null) {
    this.items = items;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  // --- the two business rules ---------------------------------------------

  /** Free once the order reaches $100, otherwise a flat $5. */
  static shippingCostFor(totalPrice: Dollar): Dollar {
    return totalPrice.cents >= 10000 ? new Dollar(0) : new Dollar(500);
  }

  /** Tiered: under $25 nothing, to $99.99 five percent, $100 up ten. */
  static discountFor(totalPrice: Dollar): Percentage {
    if (totalPrice.cents >= 10000) return new Percentage(10);
    if (totalPrice.cents >= 2500) return new Percentage(5);
    return new Percentage(0);
  }

  // --- the Total Cart Price rule, over a bare item total -------------------
  //
  // Stated as functions of the item total so the rule can be checked straight
  // from its Examples table, which gives a TotalItems figure and no items.
  // "Discount applied before shipping calculated", per that table's own note.

  /** The discount as money: the tiered percentage of the item total. */
  static discountAmountFor(totalItems: Dollar): Dollar {
    return totalItems.percentOf(ShoppingCart.discountFor(totalItems));
  }

  /** Shipping is judged on what the customer pays, so after the discount. */
  static shippingFor(totalItems: Dollar): Dollar {
    return ShoppingCart.shippingCostFor(
      totalItems.minus(ShoppingCart.discountAmountFor(totalItems)));
  }

  /** Item total, less the discount, plus shipping. */
  static totalPriceFor(totalItems: Dollar): Dollar {
    return totalItems.minus(ShoppingCart.discountAmountFor(totalItems))
                     .plus(ShoppingCart.shippingFor(totalItems));
  }

  // --- what this cart comes to ---------------------------------------------

  /** What the items come to before any discount or shipping. */
  subtotal(): Dollar { return this.items.computeTotal(); }

  discountAmount(): Dollar { return ShoppingCart.discountAmountFor(this.subtotal()); }

  shippingCost(): Dollar { return ShoppingCart.shippingFor(this.subtotal()); }

  computeTotal(): Dollar { return ShoppingCart.totalPriceFor(this.subtotal()); }
}
