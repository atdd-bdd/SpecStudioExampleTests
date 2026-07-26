package recordfilterexample

import (
	"testing"
	"recordfilterexample/common"
)

type RecordFilterExampleGlue struct {
	// Add state fields here
}

func NewRecordFilterExampleGlue() *RecordFilterExampleGlue { return &RecordFilterExampleGlue{} }

func (g *RecordFilterExampleGlue) GivenListOfNumbers(t *testing.T, values []common.IDValueString) {
	_ = values
	t.Fatal("Not implemented: GivenListOfNumbers")
}

func (g *RecordFilterExampleGlue) WhenFilteredByIDWithValue(t *testing.T, values [][]string) {
	_ = values
	t.Fatal("Not implemented: WhenFilteredByIDWithValue")
}

func (g *RecordFilterExampleGlue) ThenSumIs(t *testing.T, values [][]string) {
	_ = values
	t.Fatal("Not implemented: ThenSumIs")
}

func (g *RecordFilterExampleGlue) WhenFilteredBy(t *testing.T, values []common.FilterValueString) {
	_ = values
	t.Fatal("Not implemented: WhenFilteredBy")
}

func (g *RecordFilterExampleGlue) ThenResult(t *testing.T, values []common.ResultValueString) {
	_ = values
	t.Fatal("Not implemented: ThenResult")
}

func (g *RecordFilterExampleGlue) WhenElementAdded(t *testing.T, values []common.IDValueString) {
	_ = values
	t.Fatal("Not implemented: WhenElementAdded")
}

func (g *RecordFilterExampleGlue) ExamplesCalculationConvertFToC(t *testing.T, values []common.FandCString) {
	_ = values
	t.Fatal("Not implemented: ExamplesCalculationConvertFToC")
}

func (g *RecordFilterExampleGlue) ExamplesDataTypeIDForm(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeIDForm")
}

func (g *RecordFilterExampleGlue) ExamplesCalculationAddTwoNumbers(t *testing.T, values []common.AdderString) {
	_ = values
	t.Fatal("Not implemented: ExamplesCalculationAddTwoNumbers")
}

func (g *RecordFilterExampleGlue) ExamplesBusinessRuleShippingCost(t *testing.T, values []common.ShippingString) {
	_ = values
	t.Fatal("Not implemented: ExamplesBusinessRuleShippingCost")
}

func (g *RecordFilterExampleGlue) ExamplesBusinessRuleDiscount(t *testing.T, values []common.DiscountingString) {
	_ = values
	t.Fatal("Not implemented: ExamplesBusinessRuleDiscount")
}

func (g *RecordFilterExampleGlue) ExamplesDataTypePercentage(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypePercentage")
}

func (g *RecordFilterExampleGlue) ExamplesDataTypeDollar(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeDollar")
}

func (g *RecordFilterExampleGlue) ExamplesDataTypeSimpleText(t *testing.T, values []common.ValidValuesString) {
	_ = values
	t.Fatal("Not implemented: ExamplesDataTypeSimpleText")
}
