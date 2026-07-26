package types

import (
	"testing"
	"types/common"
)

type TypesGlue struct {
	// Add state fields here
}

func NewTypesGlue() *TypesGlue { return &TypesGlue{} }

func (g *TypesGlue) ExamplesDataTypeDollar(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeDollar")
}

func (g *TypesGlue) ExamplesDataTypeSimpleText(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeSimpleText")
}

func (g *TypesGlue) ExamplesCalculationAddTwoNumbers(t *testing.T, values []common.AdderString) {
	_ = values
	t.Fatal("Not implemented: ExamplesCalculationAddTwoNumbers")
}

func (g *TypesGlue) ExamplesCalculationConvertFToC(t *testing.T, values []common.FandCString) {
	_ = values
	t.Fatal("Not implemented: ExamplesCalculationConvertFToC")
}

func (g *TypesGlue) ExamplesDataTypeIDForm(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeIDForm")
}

func (g *TypesGlue) ExamplesBusinessRuleShippingCost(t *testing.T, values []common.ShippingString) {
	_ = values
	t.Fatal("Not implemented: ExamplesBusinessRuleShippingCost")
}

func (g *TypesGlue) ExamplesBusinessRuleDiscount(t *testing.T, values []common.DiscountingString) {
	_ = values
	t.Fatal("Not implemented: ExamplesBusinessRuleDiscount")
}

func (g *TypesGlue) ExamplesDataTypePercentage(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypePercentage")
}
