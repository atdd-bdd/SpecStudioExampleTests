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
}

func TestShoppingCart_Scenario_AShoppingCartWithAddresses(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList7 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList7)
	objectList8 := []common.ShoppingCartString{
		common.ShoppingCartString{Items: "=EmptyCart", Shipping: "$0", Discount: "$0", TotalPrice: "$0", ShippingAddress: common.AddressString{Street: "2 Apple Lane", City: "Somewhere", State: "NC", ZIP: "27706"}, BillingAddress: common.AddressString{Street: "1 Apple Lane", City: "Somewhere", State: "NC", ZIP: "27705"}},
	}
	glue.GivenShoppingCart(t, objectList8)
}

func TestShoppingCart_Scenario_AddItemsToShoppingCart(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList9 := []common.CatalogItemString{
		common.NewCatalogItemStringFromSlice([]string{"Widget", "10"}),
		common.NewCatalogItemStringFromSlice([]string{"WhatCallIt", "20"}),
		common.NewCatalogItemStringFromSlice([]string{"ThingaMaJig", "30"}),
	}
	glue.GivenCatalogHas(t, objectList9)
	objectList10 := []common.ShoppingCartString{
		common.ShoppingCartString{Items: "=EmptyCart", Shipping: "$0", Discount: "$0", TotalPrice: "$0", ShippingAddress: common.AddressString{Street: "", City: "", State: "", ZIP: ""}, BillingAddress: common.AddressString{Street: "", City: "", State: "", ZIP: ""}},
	}
	glue.GivenShoppingCart(t, objectList10)
	objectList11 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"Widget", "2", "1", "1"}),
	}
	glue.WhenItemAdded(t, objectList11)
	objectList12 := []common.OrderItemString{
		common.NewOrderItemStringFromSlice([]string{"WhatCallIt", "3", "1", "1"}),
	}
	glue.WhenItemAdded(t, objectList12)
	objectList13 := []common.ShoppingCartString{
		common.ShoppingCartString{Items: "=TwoItemCart", Shipping: "$5", Discount: "$4", TotalPrice: "$81", ShippingAddress: common.AddressString{Street: "", City: "", State: "", ZIP: ""}, BillingAddress: common.AddressString{Street: "", City: "", State: "", ZIP: ""}},
	}
	glue.ThenShoppingCartIs(t, objectList13)
}

func TestShoppingCart_Scenario_CostOfEmptyOrderItemCollection(t *testing.T) {
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

func TestShoppingCart_BusinessRule_ShippingCost(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList17 := []common.ShippingString{
		common.NewShippingStringFromSlice([]string{"$99.99", "$5.00", "Less than $100"}),
		common.NewShippingStringFromSlice([]string{"$100.00", "$0", "Free if $100 or more"}),
	}
	glue.ExamplesBusinessRuleShippingCost(t, objectList17)
}

func TestShoppingCart_BusinessRule_Discount(t *testing.T) {
	glue := NewShoppingCartGlue()
	objectList18 := []common.DiscountingString{
		common.NewDiscountingStringFromSlice([]string{"$24.99", "0", ""}),
		common.NewDiscountingStringFromSlice([]string{"$25.00", "5", ""}),
		common.NewDiscountingStringFromSlice([]string{"$99.99", "5", ""}),
		common.NewDiscountingStringFromSlice([]string{"$100.00", "10", ""}),
	}
	glue.ExamplesBusinessRuleDiscount(t, objectList18)
}

func TestShoppingCart_DataType_Percentage(t *testing.T) {
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

