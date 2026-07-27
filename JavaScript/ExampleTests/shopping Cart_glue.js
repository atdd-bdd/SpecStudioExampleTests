import { CartInputTyped, CatalogItemTyped, DiscountInputTyped, ItemPriceInputTyped,
         OrderItemTyped, ShippingInputTyped, ShoppingCartTyped,
         ValidValuesTyped } from "./common/index.js";
import { Catalog, CatalogItem, Dollar, OrderItem, OrderItemCollection,
         Percentage, ShoppingCart, SimpleText } from "./production/index.js";

export class ShoppingCartGlue {
  static DNC_STRING = "?DNC?";

  constructor() {
    this.catalog = new Catalog();
    this.currentItems = new OrderItemCollection();
    this.computedTotal = new Dollar(0);
  }

  #cart() { return new ShoppingCart(this.currentItems); }

  givenCatalogHas(values) {
    values.forEach((value) => {
      const typed = CatalogItemTyped.fromStringObj(value);
      this.catalog.add(new CatalogItem(new SimpleText(typed.name),
                                       new Dollar(typed.price)));
    });
  }

  givenItemCollectionIs(values) { this.givenItemCollection(values); }

  givenItemCollection(values) {
    this.currentItems = new OrderItemCollection();
    values.forEach((value) => {
      const typed = OrderItemTyped.fromStringObj(value);
      this.currentItems.add(new OrderItem(
        new SimpleText(typed.name), typed.quantity,
        new Dollar(typed.price), new Dollar(typed.itemTotal)));
    });
  }

  whenItemAdded(values) {
    values.forEach((value) => {
      const typed = OrderItemTyped.fromStringObj(value);
      const item = OrderItem.fromCatalog(
        this.catalog, new SimpleText(typed.name), typed.quantity);
      expect(item).not.toBeNull();
      this.currentItems.add(item);
    });
  }

  thenItemCollectionIs(values) {
    const actual = this.currentItems.read();
    expect(actual.length).toBe(values.length);
    values.forEach((value, i) => {
      const typed = OrderItemTyped.fromStringObj(value);
      expect(actual[i].name.value).toBe(typed.name);
      expect(actual[i].quantity).toBe(typed.quantity);
      expect(actual[i].price.equals(new Dollar(typed.price))).toBe(true);
      expect(actual[i].itemTotal.equals(new Dollar(typed.itemTotal))).toBe(true);
    });
  }

  givenShoppingCart(values) {
    // Every scenario starts from =EmptyCart, which carries no data rows, so
    // begin with a fresh collection rather than resolving the Define.
    this.currentItems = new OrderItemCollection();
  }

  thenShoppingCartIs(values) {
    values.forEach((value) => {
      const typed = ShoppingCartTyped.fromStringObj(value);
      const cart = this.#cart();
      // Shipping and Discount are outcomes of the two business rules, not the
      // values the Given supplied, so ask the cart for them.
      expect(cart.computeTotal().equals(new Dollar(typed.totalPrice))).toBe(true);
      expect(cart.shippingCost().equals(new Dollar(typed.shipping))).toBe(true);
      expect(cart.discountAmount().equals(new Dollar(typed.discount))).toBe(true);
    });
  }

  whenTotalComputed() { this.computedTotal = this.currentItems.computeTotal(); }


  examplesBusinessRuleShippingCost(values) {
    values.forEach((value) => {
      const typed = ShippingInputTyped.fromStringObj(value);
      const actual = ShoppingCart.shippingCostFor(new Dollar(typed.totalPrice));
      expect(actual.equals(new Dollar(typed.shippingCost))).toBe(true);
    });
  }

  examplesBusinessRuleDiscount(values) {
    values.forEach((value) => {
      const typed = DiscountInputTyped.fromStringObj(value);
      const actual = ShoppingCart.discountFor(new Dollar(typed.totalPrice));
      expect(actual.equals(new Percentage(typed.discount))).toBe(true);
    });
  }

  examplesDataTypePercentage(values) {
    values.forEach((value) => {
      const vvt = ValidValuesTyped.fromStringObj(value);
      let failed = false;
      try { new Percentage(vvt.value); } catch (e) { failed = true; }
      expect(vvt.isValid).toBe(!failed);
    });
  }

  thenTotalOfItemsIs(values) {
    values.forEach((value) => {
      const typed = ItemPriceInputTyped.fromStringObj(value);
      expect(this.currentItems.computeTotal().equals(new Dollar(typed.totalItems)))
        .toBe(true);
    });
  }

  examplesBusinessRuleTotalCartPrice(values) {
    values.forEach((value) => {
      const typed = CartInputTyped.fromStringObj(value);
      // The rule states the whole calculation from an item total, so drive it
      // that way rather than building a cart to reach the same numbers.
      const total = new Dollar(typed.totalItems);
      expect(ShoppingCart.discountAmountFor(total).equals(new Dollar(typed.discount)))
        .toBe(true);
      expect(ShoppingCart.shippingFor(total).equals(new Dollar(typed.shipping)))
        .toBe(true);
      expect(ShoppingCart.totalPriceFor(total).equals(new Dollar(typed.totalPrice)))
        .toBe(true);
    });
  }
}
