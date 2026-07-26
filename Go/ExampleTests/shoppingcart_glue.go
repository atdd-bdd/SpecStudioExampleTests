package exampletests

import (
	"testing"
	"exampletests/common"
	"exampletests/production"
)

type ShoppingCartGlue struct {
	catalog       *production.Catalog
	currentItems  *production.OrderItemCollection
	computedTotal production.Dollar
}

func NewShoppingCartGlue() *ShoppingCartGlue {
	return &ShoppingCartGlue{
		catalog:      production.NewCatalog(),
		currentItems: production.NewOrderItemCollection(),
	}
}

func (g *ShoppingCartGlue) cart() *production.ShoppingCart {
	return production.NewShoppingCart(g.currentItems)
}

func mustDollar(t *testing.T, s string) production.Dollar {
	d, err := production.ParseDollar(s)
	if err != nil {
		t.Fatalf("bad dollar %q: %v", s, err)
	}
	return d
}

func (g *ShoppingCartGlue) GivenCatalogHas(t *testing.T, values []common.CatalogItemString) {
	for _, value := range values {
		typed := common.NewCatalogItemTypedFromString(value)
		g.catalog.Add(production.NewCatalogItem(
			production.NewSimpleText(typed.Name), mustDollar(t, typed.Price)))
	}
}

func (g *ShoppingCartGlue) GivenItemCollectionIs(t *testing.T, values []common.OrderItemString) {
	g.GivenItemCollection(t, values)
}

func (g *ShoppingCartGlue) GivenItemCollection(t *testing.T, values []common.OrderItemString) {
	g.currentItems = production.NewOrderItemCollection()
	for _, value := range values {
		typed := common.NewOrderItemTypedFromString(value)
		g.currentItems.Add(production.NewOrderItem(
			production.NewSimpleText(typed.Name), typed.Quantity,
			mustDollar(t, typed.Price), mustDollar(t, typed.ItemTotal)))
	}
}

func (g *ShoppingCartGlue) WhenItemAdded(t *testing.T, values []common.OrderItemString) {
	for _, value := range values {
		typed := common.NewOrderItemTypedFromString(value)
		item, ok := production.OrderItemFromCatalog(
			g.catalog, production.NewSimpleText(typed.Name), typed.Quantity)
		if !ok {
			t.Fatalf("item not in catalog: %s", typed.Name)
		}
		g.currentItems.Add(item)
	}
}

func (g *ShoppingCartGlue) ThenItemCollectionIs(t *testing.T, values []common.OrderItemString) {
	actual := g.currentItems.Read()
	if len(values) != len(actual) {
		t.Fatalf("Item count: expected %d, got %d", len(values), len(actual))
	}
	for i, value := range values {
		typed := common.NewOrderItemTypedFromString(value)
		a := actual[i]
		if typed.Name != a.Name.Value {
			t.Errorf("Item %d name: expected %s, got %s", i, typed.Name, a.Name.Value)
		}
		if typed.Quantity != a.Quantity {
			t.Errorf("Item %d quantity: expected %d, got %d", i, typed.Quantity, a.Quantity)
		}
		if e := mustDollar(t, typed.Price); e != a.Price {
			t.Errorf("Item %d price: expected %s, got %s", i, e, a.Price)
		}
		if e := mustDollar(t, typed.ItemTotal); e != a.ItemTotal {
			t.Errorf("Item %d itemTotal: expected %s, got %s", i, e, a.ItemTotal)
		}
	}
}

func (g *ShoppingCartGlue) GivenShoppingCart(t *testing.T, values []common.ShoppingCartString) {
	// Every scenario starts from =EmptyCart, which carries no data rows, so
	// begin with a fresh collection rather than resolving the Define.
	g.currentItems = production.NewOrderItemCollection()
}

func (g *ShoppingCartGlue) ThenShoppingCartIs(t *testing.T, values []common.ShoppingCartString) {
	for _, value := range values {
		typed := common.NewShoppingCartTypedFromString(value)
		cart := g.cart()
		// Shipping and Discount are outcomes of the two business rules, not the
		// values the Given supplied, so ask the cart for them.
		if e := mustDollar(t, typed.TotalPrice); e != cart.ComputeTotal() {
			t.Errorf("TotalPrice: expected %s, got %s", e, cart.ComputeTotal())
		}
		if e := mustDollar(t, typed.Shipping); e != cart.ShippingCost() {
			t.Errorf("Shipping: expected %s, got %s", e, cart.ShippingCost())
		}
		if e := mustDollar(t, typed.Discount); e != cart.DiscountAmount() {
			t.Errorf("Discount: expected %s, got %s", e, cart.DiscountAmount())
		}
	}
}

func (g *ShoppingCartGlue) WhenTotalComputed(t *testing.T) {
	g.computedTotal = g.currentItems.ComputeTotal()
}

func (g *ShoppingCartGlue) ThenResultIs(t *testing.T, values []common.PricingString) {
	for _, value := range values {
		typed := common.NewPricingTypedFromString(value)
		if e := mustDollar(t, typed.TotalPrice); e != g.computedTotal {
			t.Errorf("TotalPrice: expected %s, got %s", e, g.computedTotal)
		}
	}
}

func (g *ShoppingCartGlue) ExamplesBusinessRuleShippingCost(t *testing.T, values []common.ShippingString) {
	for _, value := range values {
		typed := common.NewShippingTypedFromString(value)
		got := production.ShippingCostFor(mustDollar(t, typed.TotalPrice))
		if e := mustDollar(t, typed.ShippingCost); e != got {
			t.Errorf("Shipping cost for %s: expected %s, got %s", typed.TotalPrice, e, got)
		}
	}
}

func (g *ShoppingCartGlue) ExamplesBusinessRuleDiscount(t *testing.T, values []common.DiscountingString) {
	for _, value := range values {
		typed := common.NewDiscountingTypedFromString(value)
		got := production.DiscountFor(mustDollar(t, typed.TotalPrice))
		e, err := production.ParsePercentage(typed.Discount)
		if err != nil {
			t.Fatalf("bad percentage %q: %v", typed.Discount, err)
		}
		if e != got {
			t.Errorf("Discount for %s: expected %s, got %s", typed.TotalPrice, e, got)
		}
	}
}

func (g *ShoppingCartGlue) ExamplesDataTypePercentage(t *testing.T, values []common.ValidValuesString) {
	for _, value := range values {
		vvt := common.NewValidValuesTypedFromString(value)
		_, err := production.ParsePercentage(vvt.Value)
		if vvt.IsValid != (err == nil) {
			t.Errorf(" Value %s: expected valid=%v, got %v", vvt.Value, vvt.IsValid, err == nil)
		}
	}
}
