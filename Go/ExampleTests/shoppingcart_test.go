package exampletests

import (
	"testing"
	"exampletests/common"
)

func TestShoppingCart_Scenario_AddItems(t *testing.T) {
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
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "1", "1"}),
	}
	glue.WhenItemAdded(t, objectList3)
	objectList4 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "$10.00", "$20.00"}),
	}
	glue.ThenItemCollectionIs(t, objectList4)
	objectList5 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"WhatCallIt", "3", "1", "1"}),
	}
	glue.WhenItemAdded(t, objectList5)
	objectList6 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "$10.00", "$20.00"}),
		common.NewOrderItemStringFromSlice([]string{"WhatCallIt", "3", "$20.00", "$60.00"}),
	}
	glue.ThenItemCollectionIs(t, objectList6)
	objectList7 := []common.ItemPriceInputString{
		common.NewItemPriceInputStringFromSlice([]string{"$80"}),
	}
	glue.ThenTotalOfItemsIs(t, objectList7)
}

func TestShoppingCart_Scenario_AShoppingCartWithAddresses(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList8 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList8)
	objectList9 := []common.ShoppingCartString{
		common.ShoppingCartString{Items: "=EmptyCart", Shipping: "$0", Discount: "$0", TotalPrice: "$0", ShippingAddress: common.AddressString{Street: "2 Apple Lane", City: "Somewhere", State: "NC", ZIP: "27706"}, BillingAddress: common.AddressString{Street: "1 Apple Lane", City: "Somewhere", State: "NC", ZIP: "27705"}},
	}
	glue.GivenShoppingCart(t, objectList9)
}

func TestShoppingCart_Scenario_AddItemsToShoppingCart(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList10 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList10)
	objectList11 := []common.ShoppingCartString{
		common.ShoppingCartString{Items: "=EmptyCart", Shipping: "$0", Discount: "$0", TotalPrice: "$0", ShippingAddress: common.AddressString{Street: "", City: "", State: "", ZIP: ""}, BillingAddress: common.AddressString{Street: "", City: "", State: "", ZIP: ""}},
	}
	glue.GivenShoppingCart(t, objectList11)
	objectList12 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "1", "1"}),
	}
	glue.WhenItemAdded(t, objectList12)
	objectList13 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"WhatCallIt", "3", "1", "1"}),
	}
	glue.WhenItemAdded(t, objectList13)
	objectList14 := []common.ShoppingCartString{
		common.ShoppingCartString{Items: "=TwoItemCart", Shipping: "$5", Discount: "$4", TotalPrice: "$81", ShippingAddress: common.AddressString{Street: "", City: "", State: "", ZIP: ""}, BillingAddress: common.AddressString{Street: "", City: "", State: "", ZIP: ""}},
	}
	glue.ThenShoppingCartIs(t, objectList14)
}

func TestShoppingCart_Scenario_CostOfEmptyOrderItemCollection(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList15 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList15)
	objectList16 := []common.OrderItemString{
	}
	glue.GivenItemCollection(t, objectList16)
	objectList17 := []common.ItemPriceInputString{
		common.NewItemPriceInputStringFromSlice([]string{"$0"}),
	}
	glue.ThenTotalOfItemsIs(t, objectList17)
}

func TestShoppingCart_BusinessRule_TotalCartPrice(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList18 := []common.CartInputString{
		common.NewCartInputStringFromSlice([]string{"$110", "$5", "$11", "$104", "Discount applied before shipping calculated"}),
		common.NewCartInputStringFromSlice([]string{"$80", "$5", "$4", "$81", ""}),
	}
	glue.ExamplesBusinessRuleTotalCartPrice(t, objectList18)
}

func TestShoppingCart_BusinessRule_ShippingCost(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList19 := []common.ShippingInputString{
		common.NewShippingInputStringFromSlice([]string{"$99.99", "$5.00", "Less than $100"}),
		common.NewShippingInputStringFromSlice([]string{"$100.00", "$0", "Free if $100 or more"}),
	}
	glue.ExamplesBusinessRuleShippingCost(t, objectList19)
}

func TestShoppingCart_BusinessRule_Discount(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList20 := []common.DiscountInputString{
		common.NewDiscountInputStringFromSlice([]string{"$24.99", "0", ""}),
		common.NewDiscountInputStringFromSlice([]string{"$25.00", "5", ""}),
		common.NewDiscountInputStringFromSlice([]string{"$99.99", "5", ""}),
		common.NewDiscountInputStringFromSlice([]string{"$100.00", "10", ""}),
	}
	glue.ExamplesBusinessRuleDiscount(t, objectList20)
}

func TestShoppingCart_DataType_Percentage(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList21 := []common.ValidValuesString{
		common.NewValidValuesStringFromSlice([]string{"0", "y", ""}),
		common.NewValidValuesStringFromSlice([]string{"99", "y", ""}),
		common.NewValidValuesStringFromSlice([]string{"100", "y", ""}),
		common.NewValidValuesStringFromSlice([]string{"101", "n", ""}),
		common.NewValidValuesStringFromSlice([]string{"-1", "n", ""}),
	}
	glue.ExamplesDataTypePercentage(t, objectList21)
}

