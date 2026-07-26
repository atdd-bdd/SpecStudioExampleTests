package shoppingcart

import (
	"testing"
	"shoppingcart/common"
)

type ShoppingCartGlue struct {
	// Add state fields here
}

func NewShoppingCartGlue() *ShoppingCartGlue { return &ShoppingCartGlue{} }

func (g *ShoppingCartGlue) GivenCatalogHas(t *testing.T, values []common.CatalogItemString) {
	_ = values
	t.Fatal("Not implemented: GivenCatalogHas")
}

func (g *ShoppingCartGlue) GivenItemCollectionIs(t *testing.T, values []common.OrderItemString) {
	_ = values
	t.Fatal("Not implemented: GivenItemCollectionIs")
}

func (g *ShoppingCartGlue) WhenItemAdded(t *testing.T, values []common.OrderItemString) {
	_ = values
	t.Fatal("Not implemented: WhenItemAdded")
}

func (g *ShoppingCartGlue) ThenItemCollectionIs(t *testing.T, values []common.OrderItemString) {
	_ = values
	t.Fatal("Not implemented: ThenItemCollectionIs")
}

func (g *ShoppingCartGlue) GivenShoppingCart(t *testing.T, values []common.ShoppingCartString) {
	_ = values
	t.Fatal("Not implemented: GivenShoppingCart")
}

func (g *ShoppingCartGlue) ThenShoppingCartIs(t *testing.T, values []common.ShoppingCartString) {
	_ = values
	t.Fatal("Not implemented: ThenShoppingCartIs")
}

func (g *ShoppingCartGlue) GivenItemCollection(t *testing.T, values []common.OrderItemString) {
	_ = values
	t.Fatal("Not implemented: GivenItemCollection")
}

func (g *ShoppingCartGlue) WhenTotalComputed(t *testing.T) {
	t.Fatal("Not implemented: WhenTotalComputed")
}

func (g *ShoppingCartGlue) ThenResultIs(t *testing.T, values []common.PricingString) {
	_ = values
	t.Fatal("Not implemented: ThenResultIs")
}

func (g *ShoppingCartGlue) ExamplesBusinessRuleShippingCost(t *testing.T, values []common.ShippingString) {
	_ = values
	t.Fatal("Not implemented: ExamplesBusinessRuleShippingCost")
}

func (g *ShoppingCartGlue) ExamplesBusinessRuleDiscount(t *testing.T, values []common.DiscountingString) {
	_ = values
	t.Fatal("Not implemented: ExamplesBusinessRuleDiscount")
}

func (g *ShoppingCartGlue) ExamplesDataTypePercentage(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypePercentage")
}

func (g *ShoppingCartGlue) ExamplesCalculationAddTwoNumbers(t *testing.T, values []common.AdderString) {
	_ = values
	t.Fatal("Not implemented: ExamplesCalculationAddTwoNumbers")
}

func (g *ShoppingCartGlue) ExamplesCalculationConvertFToC(t *testing.T, values []common.FandCString) {
	_ = values
	t.Fatal("Not implemented: ExamplesCalculationConvertFToC")
}

func (g *ShoppingCartGlue) ExamplesDataTypeIDForm(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeIDForm")
}

func (g *ShoppingCartGlue) ExamplesDataTypeDollar(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeDollar")
}

func (g *ShoppingCartGlue) ExamplesDataTypeSimpleText(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeSimpleText")
}
