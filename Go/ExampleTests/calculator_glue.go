package calculator

import (
	"testing"
	"calculator/common"
)

type CalculatorGlue struct {
	// Add state fields here
}

func NewCalculatorGlue() *CalculatorGlue { return &CalculatorGlue{} }

func (g *CalculatorGlue) ExamplesCalculationAddTwoNumbers(t *testing.T, values []common.AdderString) {
	_ = values
	t.Fatal("Not implemented: ExamplesCalculationAddTwoNumbers")
}

func (g *CalculatorGlue) ExamplesCalculationConvertFToC(t *testing.T, values []common.FandCString) {
	_ = values
	t.Fatal("Not implemented: ExamplesCalculationConvertFToC")
}

func (g *CalculatorGlue) ExamplesDataTypeIDForm(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeIDForm")
}

func (g *CalculatorGlue) ExamplesBusinessRuleShippingCost(t *testing.T, values []common.ShippingString) {
	_ = values
	t.Fatal("Not implemented: ExamplesBusinessRuleShippingCost")
}

func (g *CalculatorGlue) ExamplesBusinessRuleDiscount(t *testing.T, values []common.DiscountingString) {
	_ = values
	t.Fatal("Not implemented: ExamplesBusinessRuleDiscount")
}

func (g *CalculatorGlue) ExamplesDataTypePercentage(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypePercentage")
}

func (g *CalculatorGlue) ExamplesDataTypeDollar(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeDollar")
}

func (g *CalculatorGlue) ExamplesDataTypeSimpleText(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeSimpleText")
}
