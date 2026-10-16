package exampletests

import (
	"testing"
	"exampletests/common"
)

func TestBowling_Scenario_AddingARoll(t *testing.T) {
	glue := NewBowlingGlue()
	typedList1 := []common.PinsString{common.PinsString("5"), common.PinsString("5"), common.PinsString("4"), common.PinsString("5"), common.PinsString("8"), common.PinsString("2"), common.PinsString("10"), common.PinsString("0"), common.PinsString("10"), common.PinsString("10"), common.PinsString("6"), common.PinsString("2"), common.PinsString("10"), common.PinsString("4"), common.PinsString("6"), common.PinsString("10")}
	glue.GivenRollsAre(t, typedList1)
	typedList2 := []common.PinsString{common.PinsString("10")}
	glue.WhenRollIs(t, typedList2)
	typedList3 := []common.PinsString{common.PinsString("5"), common.PinsString("5"), common.PinsString("4"), common.PinsString("5"), common.PinsString("8"), common.PinsString("2"), common.PinsString("10"), common.PinsString("0"), common.PinsString("10"), common.PinsString("10"), common.PinsString("6"), common.PinsString("2"), common.PinsString("10"), common.PinsString("4"), common.PinsString("6"), common.PinsString("10"), common.PinsString("10")}
	glue.ThenRollsBecome(t, typedList3)
}

func TestBowling_Scenario_FullGameComputeAndDisplay(t *testing.T) {
	glue := NewBowlingGlue()
	typedList4 := []common.PinsString{common.PinsString("5"), common.PinsString("5"), common.PinsString("4"), common.PinsString("5"), common.PinsString("8"), common.PinsString("2"), common.PinsString("10"), common.PinsString("0"), common.PinsString("10"), common.PinsString("10"), common.PinsString("6"), common.PinsString("2"), common.PinsString("10"), common.PinsString("4"), common.PinsString("6"), common.PinsString("10"), common.PinsString("10")}
	glue.GivenRollsAre(t, typedList4)
	glue.WhenScored(t)
	glue.ThenDisplayIs(t, "| 5/ | 45 | 8/ | X  | -/ | X   | 62  | X   | 4/  | XX |\n| 14 | 23 | 43 | 63 | 83 | 101 | 109 | 129 | 149 |    |")
}

func TestBowling_Scenario_AGameInSteps(t *testing.T) {
	glue := NewBowlingGlue()
	typedList5 := []common.PinsString{common.PinsString("5"), common.PinsString("5"), common.PinsString("4"), common.PinsString("5"), common.PinsString("8"), common.PinsString("2"), common.PinsString("10"), common.PinsString("0"), common.PinsString("10"), common.PinsString("10"), common.PinsString("6"), common.PinsString("2"), common.PinsString("10"), common.PinsString("4"), common.PinsString("6"), common.PinsString("10"), common.PinsString("10")}
	glue.GivenRollsAre(t, typedList5)
	glue.WhenScored(t)
	objectList6 := []common.FrameValuesString{
		common.NewFrameValuesStringFromSlice([]string{"1", "5", "5", "4", "14", "14"}),
		common.NewFrameValuesStringFromSlice([]string{"2", "4", "5", "8", "9", "23"}),
		common.NewFrameValuesStringFromSlice([]string{"3", "8", "2", "10", "20", "43"}),
		common.NewFrameValuesStringFromSlice([]string{"4", "10", "0", "10", "20", "63"}),
		common.NewFrameValuesStringFromSlice([]string{"5", "0", "10", "10", "20", "83"}),
		common.NewFrameValuesStringFromSlice([]string{"6", "10", "6", "2", "18", "101"}),
		common.NewFrameValuesStringFromSlice([]string{"7", "6", "2", "10", "8", "109"}),
		common.NewFrameValuesStringFromSlice([]string{"8", "10", "4", "6", "20", "129"}),
		common.NewFrameValuesStringFromSlice([]string{"9", "4", "6", "10", "20", "149"}),
		common.NewFrameValuesStringFromSlice([]string{"10", "10", "10", "-1", "-1", "-1"}),
	}
	glue.ThenFrameValuesAre(t, objectList6)
	glue.GivenFrameValuesAreAsPrevious(t)
	objectList7 := []common.FrameDisplayString{
		common.NewFrameDisplayStringFromSlice([]string{"1", "5", "/", "", "14"}),
		common.NewFrameDisplayStringFromSlice([]string{"2", "4", "5", "", "23"}),
		common.NewFrameDisplayStringFromSlice([]string{"3", "8", "/", "", "43"}),
		common.NewFrameDisplayStringFromSlice([]string{"4", "X", "", "", "63"}),
		common.NewFrameDisplayStringFromSlice([]string{"5", "-", "/", "", "83"}),
		common.NewFrameDisplayStringFromSlice([]string{"6", "X", "", "", "101"}),
		common.NewFrameDisplayStringFromSlice([]string{"7", "6", "2", "", "109"}),
		common.NewFrameDisplayStringFromSlice([]string{"8", "X", "", "", "129"}),
		common.NewFrameDisplayStringFromSlice([]string{"9", "4", "/", "", "149"}),
		common.NewFrameDisplayStringFromSlice([]string{"10", "X", "X", "", ""}),
	}
	glue.ThenDisplayValuesAre(t, objectList7)
	typedList8 := []bool{false}
	glue.ThenGameCompleteIs(t, typedList8)
	objectList9 := []common.InputControlValuesString{
		common.NewInputControlValuesStringFromSlice([]string{"10", "3", "10"}),
	}
	glue.ThenInputControlIs(t, objectList9)
}

func TestBowling_Scenario_CheckForGameComplete(t *testing.T) {
	glue := NewBowlingGlue()
	typedList10 := []common.PinsString{common.PinsString("5"), common.PinsString("5"), common.PinsString("4"), common.PinsString("5"), common.PinsString("8"), common.PinsString("2"), common.PinsString("10"), common.PinsString("0"), common.PinsString("10"), common.PinsString("10"), common.PinsString("6"), common.PinsString("2"), common.PinsString("10"), common.PinsString("4"), common.PinsString("6"), common.PinsString("10"), common.PinsString("10"), common.PinsString("10")}
	glue.GivenRollsAre(t, typedList10)
	glue.WhenScored(t)
	typedList11 := []bool{true}
	glue.ThenGameCompleteIs(t, typedList11)
}

func TestBowling_Scenario_ValuesForTenthFrame(t *testing.T) {
	glue := NewBowlingGlue()
	typedList12 := []common.PinsString{common.PinsString("10"), common.PinsString("10")}
	glue.GivenRollsForTenthFrameAre(t, typedList12)
	glue.WhenScored(t)
	objectList13 := []common.FrameValuesString{
		common.NewFrameValuesStringFromSlice([]string{"10", "10", "10", "-1", "-1", "-1"}),
	}
	glue.ThenThenTenthFrameValuesAre(t, objectList13)
}

func TestBowling_Scenario_InputControlShouldBeForNextFrame(t *testing.T) {
	glue := NewBowlingGlue()
	typedList14 := []common.PinsString{common.PinsString("10")}
	glue.GivenRollsAre(t, typedList14)
	glue.WhenScored(t)
	objectList15 := []common.InputControlValuesString{
		common.NewInputControlValuesStringFromSlice([]string{"2", "1", "10"}),
	}
	glue.ThenInputControlIs(t, objectList15)
}

func TestBowling_Scenario_TryToAddInvalidRoll(t *testing.T) {
	glue := NewBowlingGlue()
	typedList16 := []common.PinsString{common.PinsString("5")}
	glue.GivenRollsAre(t, typedList16)
	glue.WhenScored(t)
	typedList17 := []common.PinsString{common.PinsString("6")}
	glue.WhenRollIs(t, typedList17)
	typedList18 := []common.PinsString{common.PinsString("5")}
	glue.ThenRollsBecome(t, typedList18)
}

func TestBowling_DataType_Pins(t *testing.T) {
	glue := NewBowlingGlue()
	objectList19 := []common.ValidValuesString{
		common.NewValidValuesStringFromSlice([]string{"0", "true", ""}),
		common.NewValidValuesStringFromSlice([]string{"10", "true", ""}),
		common.NewValidValuesStringFromSlice([]string{"11", "false", ""}),
		common.NewValidValuesStringFromSlice([]string{"-2", "false", ""}),
		common.NewValidValuesStringFromSlice([]string{"-1", "true", "Used for To Be Rolled"}),
	}
	glue.ExamplesDataTypePins(t, objectList19)
}

func TestBowling_DataType_Score(t *testing.T) {
	glue := NewBowlingGlue()
	objectList20 := []common.ValidValuesString{
		common.NewValidValuesStringFromSlice([]string{"0", "yes", ""}),
		common.NewValidValuesStringFromSlice([]string{"300", "yes", ""}),
		common.NewValidValuesStringFromSlice([]string{"301", "no", ""}),
		common.NewValidValuesStringFromSlice([]string{"-1", "yes", "To be scored"}),
	}
	glue.ExamplesDataTypeScore(t, objectList20)
}

