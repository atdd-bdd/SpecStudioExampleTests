package recordfilterexample

import (
	"testing"
	"recordfilterexample/common"
)

func TestScenario_FilterDataByID(t *testing.T) {
	glue := NewRecordFilterExampleGlue()
	objectList1 := []common.IDValueString{
		common.NewIDValueStringFromSlice([]string{"Q1234", "1"}),
		common.NewIDValueStringFromSlice([]string{"Q9999", "2"}),
		common.NewIDValueStringFromSlice([]string{"Q1234", "3"}),
	}
	glue.GivenListOfNumbers(t, objectList1)
	stringListList2 := [][]string{
		{"Q1234"},
	}
	glue.WhenFilteredByIDWithValue(t, stringListList2)
	stringListList3 := [][]string{
		{"4"},
	}
	glue.ThenSumIs(t, stringListList3)
}

func TestScenario_FilterDataAnotherWay(t *testing.T) {
	glue := NewRecordFilterExampleGlue()
	objectList4 := []common.IDValueString{
		common.NewIDValueStringFromSlice([]string{"Q1234", "1"}),
		common.NewIDValueStringFromSlice([]string{"Q9999", "2"}),
		common.NewIDValueStringFromSlice([]string{"Q1234", "3"}),
	}
	glue.GivenListOfNumbers(t, objectList4)
	objectList5 := []common.FilterValueString{
		common.NewFilterValueStringFromSlice([]string{"Q1234"}),
	}
	glue.WhenFilteredBy(t, objectList5)
	objectList6 := []common.ResultValueString{
		common.NewResultValueStringFromSlice([]string{"4"}),
	}
	glue.ThenResult(t, objectList6)
}

func TestScenario_AddAnotherValue(t *testing.T) {
	glue := NewRecordFilterExampleGlue()
	objectList7 := []common.IDValueString{
		common.NewIDValueStringFromSlice([]string{"Q1234", "1"}),
		common.NewIDValueStringFromSlice([]string{"Q9999", "2"}),
		common.NewIDValueStringFromSlice([]string{"Q1234", "3"}),
	}
	glue.GivenListOfNumbers(t, objectList7)
	objectList8 := []common.IDValueString{
		common.NewIDValueStringFromSlice([]string{"Q1234", "4"}),
	}
	glue.WhenElementAdded(t, objectList8)
	objectList9 := []common.FilterValueString{
		common.NewFilterValueStringFromSlice([]string{"Q1234"}),
	}
	glue.WhenFilteredBy(t, objectList9)
	objectList10 := []common.ResultValueString{
		common.NewResultValueStringFromSlice([]string{"8"}),
	}
	glue.ThenResult(t, objectList10)
}

func TestCalculation_ConvertFToC(t *testing.T) {
	glue := NewRecordFilterExampleGlue()
	objectList11 := []common.FandCString{
		common.NewFandCStringFromSlice([]string{"32", "0", "Freezing"}),
		common.NewFandCStringFromSlice([]string{"212", "100", "Boiling"}),
		common.NewFandCStringFromSlice([]string{"-40", "-40", "Below zero"}),
		common.NewFandCStringFromSlice([]string{"68", "20", "Photo chem"}),
	}
	glue.ExamplesCalculationConvertFToC(t, objectList11)
}

func TestDataType_IDForm(t *testing.T) {
	glue := NewRecordFilterExampleGlue()
	objectList12 := []common.ValidValuesString{
		common.NewValidValuesStringFromSlice([]string{"Q1234", "true", ""}),
		common.NewValidValuesStringFromSlice([]string{"Q123", "false", "Too short"}),
		common.NewValidValuesStringFromSlice([]string{"Q12345", "false", "Too long"}),
		common.NewValidValuesStringFromSlice([]string{"A1234", "false", "Must begin with Q"}),
	}
	glue.ExamplesDataTypeIDForm(t, objectList12)
}

