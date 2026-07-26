package exampletests

import (
	"testing"
	"exampletests/common"
)

func TestTypes_DataType_Dollar(t *testing.T) {
	glue := NewTypesGlue()
	objectList1 := []common.ValidValuesString{
		common.NewValidValuesStringFromSlice([]string{"0", "true", ""}),
		common.NewValidValuesStringFromSlice([]string{"0.01", "true", ""}),
		common.NewValidValuesStringFromSlice([]string{"-1", "false", "Negative not allowed"}),
		common.NewValidValuesStringFromSlice([]string{"0.001", "false", "Only 2 decimal digits"}),
	}
	glue.ExamplesDataTypeDollar(t, objectList1)
}

func TestTypes_DataType_SimpleText(t *testing.T) {
	glue := NewTypesGlue()
	objectList2 := []common.ValidValuesString{
		common.NewValidValuesStringFromSlice([]string{"abc", "y", ""}),
		common.NewValidValuesStringFromSlice([]string{"ab.", "y", "period okay"}),
		common.NewValidValuesStringFromSlice([]string{"1234567890", "y", "digits"}),
		common.NewValidValuesStringFromSlice([]string{"@", "n", ""}),
		common.NewValidValuesStringFromSlice([]string{"-a-b", "y", "hyphens"}),
	}
	glue.ExamplesDataTypeSimpleText(t, objectList2)
}

