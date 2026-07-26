package exampletests

import (
	"strconv"
	"strings"
	"testing"
	"exampletests/common"
	"exampletests/production"
)

type RecordFilterExampleGlue struct {
	recordFilter *production.RecordFilter
	computedSum  int
}

func NewRecordFilterExampleGlue() *RecordFilterExampleGlue {
	return &RecordFilterExampleGlue{recordFilter: production.NewRecordFilter()}
}

func (g *RecordFilterExampleGlue) GivenListOfNumbers(t *testing.T, values []common.IDValueString) {
	g.recordFilter = production.NewRecordFilter()
	for _, value := range values {
		typed := common.NewIDValueTypedFromString(value)
		id, err := production.ParseIDForm(typed.ID)
		if err != nil {
			t.Fatalf("bad ID %s: %v", typed.ID, err)
		}
		g.recordFilter.Add(production.NewIDValue(id, typed.Value))
	}
}

func (g *RecordFilterExampleGlue) WhenFilteredByIDWithValue(t *testing.T, values [][]string) {
	if len(values) > 0 && len(values[0]) > 0 {
		id, err := production.ParseIDForm(values[0][0])
		if err != nil {
			t.Fatalf("bad ID %s: %v", values[0][0], err)
		}
		g.computedSum = g.recordFilter.SumByLabel(id)
	}
}

func (g *RecordFilterExampleGlue) ThenSumIs(t *testing.T, values [][]string) {
	if len(values) > 0 && len(values[0]) > 0 {
		expected, err := strconv.Atoi(strings.TrimSpace(values[0][0]))
		if err != nil {
			t.Fatalf("not a number: %s", values[0][0])
		}
		if expected != g.computedSum {
			t.Errorf("Sum: expected %d, got %d", expected, g.computedSum)
		}
	}
}

func (g *RecordFilterExampleGlue) WhenFilteredBy(t *testing.T, values []common.FilterValueString) {
	for _, value := range values {
		typed := common.NewFilterValueTypedFromString(value)
		id, err := production.ParseIDForm(typed.Value)
		if err != nil {
			t.Fatalf("bad ID %s: %v", typed.Value, err)
		}
		g.computedSum = g.recordFilter.SumByLabel(id)
	}
}

func (g *RecordFilterExampleGlue) ThenResult(t *testing.T, values []common.ResultValueString) {
	for _, value := range values {
		typed := common.NewResultValueTypedFromString(value)
		if typed.Sum != g.computedSum {
			t.Errorf("Filtered sum: expected %d, got %d", typed.Sum, g.computedSum)
		}
	}
}

func (g *RecordFilterExampleGlue) WhenElementAdded(t *testing.T, values []common.IDValueString) {
	for _, value := range values {
		typed := common.NewIDValueTypedFromString(value)
		id, err := production.ParseIDForm(typed.ID)
		if err != nil {
			t.Fatalf("bad ID %s: %v", typed.ID, err)
		}
		g.recordFilter.Add(production.NewIDValue(id, typed.Value))
	}
}

func (g *RecordFilterExampleGlue) ExamplesCalculationConvertFToC(t *testing.T, values []common.FandCString) {
	for _, value := range values {
		typed := common.NewFandCTypedFromString(value)
		if got := production.FahrenheitToCelsius(typed.F); got != typed.C {
			t.Errorf("Convert %dF to C: expected %d, got %d", typed.F, typed.C, got)
		}
	}
}

func (g *RecordFilterExampleGlue) ExamplesDataTypeIDForm(t *testing.T, values []common.ValidValuesString) {
	for _, value := range values {
		vvt := common.NewValidValuesTypedFromString(value)
		_, err := production.ParseIDForm(vvt.Value)
		if vvt.IsValid != (err == nil) {
			t.Errorf(" Value %s: expected valid=%v, got %v", vvt.Value, vvt.IsValid, err == nil)
		}
	}
}
