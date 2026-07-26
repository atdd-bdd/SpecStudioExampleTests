package shoppingcart

import (
	"testing"
	"shoppingcart/common"
)

func TestScenario_AddItems(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList1 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList1)
	objectList2 := []common.OrderItemString{
	}
	glue.GivenItemCollectionIs(t, objectList2)
	objectList3 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "", ""}),
	}
	glue.WhenItemAdded(t, objectList3)
	objectList4 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "$10.00", "$20.00"}),
	}
	glue.ThenItemCollectionIs(t, objectList4)
	objectList5 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"WhatCallIt", "3", "", ""}),
	}
	glue.WhenItemAdded(t, objectList5)
	objectList6 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "$10.00", "$20.00"}),
		common.NewOrderItemStringFromSlice([]string{"WhatCallIt", "3", "$20.00", "$60.00"}),
	}
	glue.ThenItemCollectionIs(t, objectList6)
}

func TestScenario_AShoppingCartWithAddresses(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList7 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList7)
	objectList8 := []common.ShoppingCartString{
		common.NewShoppingCartStringFromSlice([]string{"=EmptyCart", "", "", "", "=AShippingAddress", "=ABillingAddress"}),
	}
	glue.GivenShoppingCart(t, objectList8)
}

func TestScenario_AddItemsToShoppingCart(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList9 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList9)
	objectList10 := []common.ShoppingCartString{
		common.NewShoppingCartStringFromSlice([]string{"=EmptyCart", "$0", "$0", "$0", "", ""}),
	}
	glue.GivenShoppingCart(t, objectList10)
	objectList11 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "", ""}),
	}
	glue.WhenItemAdded(t, objectList11)
	objectList12 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"WhatCallIt", "3", "", ""}),
	}
	glue.WhenItemAdded(t, objectList12)
	objectList13 := []common.ShoppingCartString{
		common.NewShoppingCartStringFromSlice([]string{"=TwoItemCart", "$0", "$0", "$80", "", ""}),
	}
	glue.ThenShoppingCartIs(t, objectList13)
}

func TestScenario_CostOfEmptyOrderItemCollection(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList14 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList14)
	objectList15 := []common.OrderItemString{
	}
	glue.GivenItemCollection(t, objectList15)
	glue.WhenTotalComputed(t)
	objectList16 := []common.PricingString{
		common.NewPricingStringFromSlice([]string{"$0"}),
	}
	glue.ThenResultIs(t, objectList16)
}

func TestBusinessRule_ShippingCost(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList17 := []common.ShippingString{
		common.NewShippingStringFromSlice([]string{"$99.99", "$5.00", "Less than $100"}),
		common.NewShippingStringFromSlice([]string{"$100.00", "$0", "Free if $100 or more"}),
	}
	glue.ExamplesBusinessRuleShippingCost(t, objectList17)
}

func TestBusinessRule_Discount(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList18 := []common.DiscountingString{
		common.NewDiscountingStringFromSlice([]string{"$24.99", "0", ""}),
		common.NewDiscountingStringFromSlice([]string{"$25.00", "5", ""}),
		common.NewDiscountingStringFromSlice([]string{"$99.99", "5", ""}),
		common.NewDiscountingStringFromSlice([]string{"$100.00", "10", ""}),
	}
	glue.ExamplesBusinessRuleDiscount(t, objectList18)
}

func TestDataType_Percentage(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList19 := []common.ValidValuesString{
		common.NewValidValuesStringFromSlice([]string{"0", "y", ""}),
		common.NewValidValuesStringFromSlice([]string{"99", "y", ""}),
		common.NewValidValuesStringFromSlice([]string{"100", "y", ""}),
		common.NewValidValuesStringFromSlice([]string{"101", "n", ""}),
		common.NewValidValuesStringFromSlice([]string{"-1", "n", ""}),
	}
	glue.ExamplesDataTypePercentage(t, objectList19)
}

