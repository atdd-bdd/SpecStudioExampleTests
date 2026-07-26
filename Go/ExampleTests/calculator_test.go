package exampletests

import (
	"testing"
	"exampletests/common"
)

func TestCalculator_Calculation_AddTwoNumbers(t *testing.T) {
	glue := NewCalculatorGlue()
	objectList1 := []common.AdderString{
		common.NewAdderStringFromSlice([]string{"2", "3", "5"}),
		common.NewAdderStringFromSlice([]string{"10", "20", "30"}),
		common.NewAdderStringFromSlice([]string{"-1", "1", "0"}),
	}
	glue.ExamplesCalculationAddTwoNumbers(t, objectList1)
}

