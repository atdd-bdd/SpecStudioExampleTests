package exampletests

import (
	"testing"
	"exampletests/common"
	"exampletests/production"
)

type TypesGlue struct{}

func NewTypesGlue() *TypesGlue { return &TypesGlue{} }

func (g *TypesGlue) ExamplesDataTypeDollar(t *testing.T, values []common.ValidValuesString) {
	for _, value := range values {
		vvt := common.NewValidValuesTypedFromString(value)
		_, err := production.ParseDollar(vvt.Value)
		if vvt.IsValid != (err == nil) {
			t.Errorf(" Value %s: expected valid=%v, got %v", vvt.Value, vvt.IsValid, err == nil)
		}
	}
}

func (g *TypesGlue) ExamplesDataTypeSimpleText(t *testing.T, values []common.ValidValuesString) {
	for _, value := range values {
		vvt := common.NewValidValuesTypedFromString(value)
		_, err := production.ParseSimpleText(vvt.Value)
		if vvt.IsValid != (err == nil) {
			t.Errorf(" Value %s: expected valid=%v, got %v", vvt.Value, vvt.IsValid, err == nil)
		}
	}
}
