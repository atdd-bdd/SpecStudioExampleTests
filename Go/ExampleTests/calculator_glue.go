package exampletests

import (
	"testing"
	"exampletests/common"
	"exampletests/production"
)

type CalculatorGlue struct {
	calc *production.Calculator
}

func NewCalculatorGlue() *CalculatorGlue {
	return &CalculatorGlue{calc: production.NewCalculator()}
}

func (g *CalculatorGlue) ExamplesCalculationAddTwoNumbers(t *testing.T, values []common.AdderString) {
	for _, value := range values {
		typed := common.NewAdderTypedFromString(value)
		if got := g.calc.Add(typed.Number1, typed.Number2); got != typed.Result {
			t.Errorf("Add %d + %d: expected %d, got %d",
				typed.Number1, typed.Number2, typed.Result, got)
		}
	}
}
