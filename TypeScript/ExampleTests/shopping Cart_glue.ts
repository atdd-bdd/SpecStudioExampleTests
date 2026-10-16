import { CartInputString, CartInputTyped, CatalogItemString, CatalogItemTyped,
         DiscountInputString, DiscountInputTyped, ItemPriceInputString,
         ItemPriceInputTyped, OrderItemString, OrderItemTyped, ShippingInputString, ShippingInputTyped, ShoppingCartString,
         ShoppingCartTyped, ValidValuesString, ValidValuesTyped } from "./common/index.js";
import { Catalog, CatalogItem, Dollar, OrderItem, OrderItemCollection,
         Percentage, ShoppingCart, SimpleText } from "./production/index.js";

export class ShoppingCartGlue {
  private catalog = new Catalog();
  private currentItems = new OrderItemCollection();
  private computedTotal = new Dollar(0);

  private cart(): ShoppingCart { return new ShoppingCart(this.currentItems); }

  givenCatalogHas(values: readonly CatalogItemString[]): void {
    values.forEach((value) => {
      const typed = CatalogItemTyped.fromStringObj(value);
      this.catalog.add(new CatalogItem(typed.name.get(),
                                       typed.price.get()));
    });
  }

  givenItemCollectionIs(values: readonly OrderItemString[]): void {
    this.givenItemCollection(values);
  }

  givenItemCollection(values: readonly OrderItemString[]): void {
    this.currentItems = new OrderItemCollection();
    values.forEach((value) => {
      const typed = OrderItemTyped.fromStringObj(value);
      this.currentItems.add(new OrderItem(
        typed.name.get(), typed.quantity,
        typed.price.get(), typed.itemTotal.get()));
    });
  }

  whenItemAdded(values: readonly OrderItemString[]): void {
    values.forEach((value) => {
      const typed = OrderItemTyped.fromStringObj(value);
      const item = OrderItem.fromCatalog(
        this.catalog, typed.name.get(), typed.quantity);
      expect(item).not.toBeNull();
      this.currentItems.add(item!);
    });
  }

  thenItemCollectionIs(values: readonly OrderItemString[]): void {
    const actual = this.currentItems.read();
    expect(actual.length).toBe(values.length);
    values.forEach((value, i) => {
      const typed = OrderItemTyped.fromStringObj(value);
      expect(actual[i]!.name.value).toBe(typed.name.text);
      expect(actual[i]!.quantity).toBe(typed.quantity);
      expect(actual[i]!.price.equals(typed.price.get())).toBe(true);
      expect(actual[i]!.itemTotal.equals(typed.itemTotal.get())).toBe(true);
    });
  }

  givenShoppingCart(values: readonly ShoppingCartString[]): void {
    // Every scenario starts from =EmptyCart, which carries no data rows, so
    // begin with a fresh collection rather than resolving the Define.
    this.currentItems = new OrderItemCollection();
  }

  thenShoppingCartIs(values: readonly ShoppingCartString[]): void {
    values.forEach((value) => {
      const typed = ShoppingCartTyped.fromStringObj(value);
      const cart = this.cart();
      // Shipping and Discount are outcomes of the two business rules, not the
      // values the Given supplied, so ask the cart for them.
      expect(cart.computeTotal().equals(typed.totalPrice.get())).toBe(true);
      expect(cart.shippingCost().equals(typed.shipping.get())).toBe(true);
      expect(cart.discountAmount().equals(typed.discount.get())).toBe(true);
    });
  }

  whenTotalComputed(): void {
    this.computedTotal = this.currentItems.computeTotal();
  }


  examplesBusinessRuleShippingCost(values: readonly ShippingInputString[]): void {
    values.forEach((value) => {
      const typed = ShippingInputTyped.fromStringObj(value);
      const actual = ShoppingCart.shippingCostFor(typed.totalPrice.get());
      expect(actual.equals(typed.shippingCost.get())).toBe(true);
    });
  }

  examplesBusinessRuleDiscount(values: readonly DiscountInputString[]): void {
    values.forEach((value) => {
      const typed = DiscountInputTyped.fromStringObj(value);
      const actual = ShoppingCart.discountFor(typed.totalPrice.get());
      expect(actual.equals(typed.discount.get())).toBe(true);
    });
  }

  examplesDataTypePercentage(values: readonly ValidValuesString[]): void {
    values.forEach((value) => {
      const vvt = ValidValuesTyped.fromStringObj(value);
      let failed = false;
      try { new Percentage(vvt.value); } catch { failed = true; }
      expect(vvt.isValid).toBe(!failed);
    });
  }

  thenTotalOfItemsIs(values: readonly ItemPriceInputString[]): void {
    values.forEach((value) => {
      const typed = ItemPriceInputTyped.fromStringObj(value);
      expect(this.currentItems.computeTotal().equals(typed.totalItems.get()))
        .toBe(true);
    });
  }

  examplesBusinessRuleTotalCartPrice(values: readonly CartInputString[]): void {
    values.forEach((value) => {
      const typed = CartInputTyped.fromStringObj(value);
      // The rule states the whole calculation from an item total, so drive it
      // that way rather than building a cart to reach the same numbers.
      const total = typed.totalItems.get();
      expect(ShoppingCart.discountAmountFor(total).equals(typed.discount.get()))
        .toBe(true);
      expect(ShoppingCart.shippingFor(total).equals(typed.shipping.get()))
        .toBe(true);
      expect(ShoppingCart.totalPriceFor(total).equals(typed.totalPrice.get()))
        .toBe(true);
    });
  }
}
