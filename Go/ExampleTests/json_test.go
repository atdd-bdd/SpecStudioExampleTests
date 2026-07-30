package exampletests

import (
	"testing"
	"exampletests/common"
)

func TestJson_Scenario_ConvertToJson(t *testing.T) {
	glue := NewJsonGlue()
	objectList1 := []common.SimpleClassString{
		common.NewSimpleClassStringFromSlice([]string{"1", "B"}),
	}
	glue.GivenOneObjectIs(t, objectList1)
	glue.ThenJsonShouldBe(t, "{anInt:\"1\",aString:\"B\"}")
}

func TestJson_Scenario_ConvertFromJson(t *testing.T) {
	glue := NewJsonGlue()
	glue.GivenJsonIs(t, "{anInt:  \"1\"   ,   aString:\"B\"  }")
	objectList2 := []common.SimpleClassString{
		common.NewSimpleClassStringFromSlice([]string{"1", "B"}),
	}
	glue.ThenTheConvertedObjectIs(t, objectList2)
}

func TestJson_Scenario_ConvertToJsonArray(t *testing.T) {
	glue := NewJsonGlue()
	objectList3 := []common.SimpleClassString{
		common.NewSimpleClassStringFromSlice([]string{"1", "B"}),
		common.NewSimpleClassStringFromSlice([]string{"2", "C"}),
	}
	glue.GivenATableIs(t, objectList3)
	glue.ThenJsonForTableShouldBe(t, "[ {anInt:\"1\",aString:\"B\"} \n, {anInt:\"2\",aString:\"C\"} \n]")
}

func TestJson_Scenario_ConvertFromJsonArray(t *testing.T) {
	glue := NewJsonGlue()
	glue.GivenJsonForTableIs(t, "[    {anInt:  \"1\"   ,   aString:\"B\"  },\n{anInt:  \"2\"   ,   aString:\"C\"  }\n]\n")
	objectList4 := []common.SimpleClassString{
		common.NewSimpleClassStringFromSlice([]string{"1", "B"}),
		common.NewSimpleClassStringFromSlice([]string{"2", "C"}),
	}
	glue.ThenTheConvertedTableShouldBe(t, objectList4)
}

