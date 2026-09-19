package exampletests

import (
	"strconv"
	"strings"
	"testing"
	"exampletests/common"
	"exampletests/production"
)

const dncString = "?DNC?"

// BowlingGlue drives BowlingGame from the specification's steps.
//
// There is no scoring here on purpose: every rule about strikes, spares, marks
// and totals lives in the production classes, and this file only hands rolls in
// and compares what comes back.
type BowlingGlue struct {
	game *production.BowlingGame
}

func NewBowlingGlue() *BowlingGlue {
	return &BowlingGlue{game: production.NewBowlingGame()}
}

// ---- given -----------------------------------------------------------------

func (g *BowlingGlue) GivenRollsAre(t *testing.T, values [][]string) {
	g.game.SetRolls(g.pinCounts(t, values))
}

func (g *BowlingGlue) GivenRollsForTenthFrameAre(t *testing.T, values [][]string) {
	g.game.SetTenthFrameRolls(g.pinCounts(t, values))
}

// GivenFrameValuesAreAsPrevious: the frame values from the previous step are
// still on the same game.
func (g *BowlingGlue) GivenFrameValuesAreAsPrevious(t *testing.T) {
	if g.game.Frames() == nil {
		t.Fatal("no game to carry forward")
	}
}

// ---- when ------------------------------------------------------------------

func (g *BowlingGlue) WhenRollIs(t *testing.T, values [][]string) {
	for _, pinCount := range g.pinCounts(t, values) {
		g.game.AddRoll(pinCount)
	}
}

func (g *BowlingGlue) WhenScored(t *testing.T) {
	g.game.Score()
}

// ---- then ------------------------------------------------------------------

func (g *BowlingGlue) ThenRollsBecome(t *testing.T, values [][]string) {
	expected := g.pinCounts(t, values)
	actual := g.game.Rolls()

	if len(expected) != len(actual) {
		t.Fatalf("number of rolls %v: expected %d but was %d", actual, len(expected), len(actual))
	}
	for i, want := range expected {
		if actual[i] != want {
			t.Errorf("roll %d: expected %d but was %d", i+1, want, actual[i])
		}
	}
}

func (g *BowlingGlue) ThenDisplayIs(t *testing.T, value string) {
	if got := g.game.Display(); got != value {
		t.Errorf("display:\nexpected\n%s\nbut was\n%s", value, got)
	}
}

func (g *BowlingGlue) ThenFrameValuesAre(t *testing.T, values []common.FrameValuesString) {
	for _, expected := range values {
		g.assertFrameEquals(t, expected)
	}
}

// ThenThenTenthFrameValuesAre: the step reads "Then Then tenth frame values are"
// in the specification, and the generated method name follows it. Renaming the
// method would only make it disagree with the generated test.
func (g *BowlingGlue) ThenThenTenthFrameValuesAre(t *testing.T, values []common.FrameValuesString) {
	for _, expected := range values {
		g.assertFrameEquals(t, expected)
	}
}

func (g *BowlingGlue) ThenDisplayValuesAre(t *testing.T, values []common.FrameDisplayString) {
	actual := g.game.Marks()

	for _, expected := range values {
		frame := g.markedFrame(t, actual, expected.Frame)
		where := "frame " + expected.Frame + " "
		g.assertField(t, where+"Mark1", expected.Mark1, frame.Mark1)
		g.assertField(t, where+"Mark2", expected.Mark2, frame.Mark2)
		g.assertField(t, where+"Mark3", expected.Mark3, frame.Mark3)
		g.assertField(t, where+"TotalScore", expected.TotalScore, frame.TotalScore)
	}
}

func (g *BowlingGlue) ThenGameCompleteIs(t *testing.T, values [][]string) {
	for _, row := range values {
		for _, expected := range row {
			got := strconv.FormatBool(g.game.IsComplete())
			if strings.TrimSpace(expected) != got {
				t.Errorf("game complete: expected %s but was %s",
					strings.TrimSpace(expected), got)
			}
		}
	}
}

func (g *BowlingGlue) ThenInputControlIs(t *testing.T, values []common.InputControlValuesString) {
	for _, expected := range values {
		actual := g.game.InputControl()
		g.assertField(t, "input control Frame", expected.Frame, strconv.Itoa(actual.Frame))
		g.assertField(t, "input control Roll", expected.Roll, strconv.Itoa(actual.Roll))
		g.assertField(t, "input control Remaining", expected.Remaining,
			strconv.Itoa(actual.Remaining))
	}
}

// ---- DataType checks -------------------------------------------------------

func (g *BowlingGlue) ExamplesDataTypePins(t *testing.T, values []common.ValidValuesString) {
	for _, value := range values {
		_, err := production.NewPins(value.Value)

		if expected := g.isTrue(value.IsValid); expected == (err != nil) {
			t.Errorf(" Value %s: expected valid=%v", value.Value, expected)
		}
	}
}

func (g *BowlingGlue) ExamplesDataTypeScore(t *testing.T, values []common.ValidValuesString) {
	for _, value := range values {
		_, err := production.NewScore(value.Value)

		if expected := g.isTrue(value.IsValid); expected == (err != nil) {
			t.Errorf(" Value %s: expected valid=%v", value.Value, expected)
		}
	}
}

// ---- helpers ---------------------------------------------------------------

// pinCounts flattens the step's table into the pin counts it lists, in order.
func (g *BowlingGlue) pinCounts(t *testing.T, values [][]string) []int {
	var result []int

	for _, row := range values {
		for _, cell := range row {
			text := strings.TrimSpace(cell)
			if text == "" {
				continue
			}
			count, err := strconv.Atoi(text)
			if err != nil {
				t.Fatalf("not a number of pins: %s", text)
			}
			result = append(result, count)
		}
	}
	return result
}

func (g *BowlingGlue) assertFrameEquals(t *testing.T, expected common.FrameValuesString) {
	frame := g.numberedFrame(t, expected.Frame)
	where := "frame " + expected.Frame + " "

	g.assertField(t, where+"Roll1", expected.Roll1, frame.Roll1.String())
	g.assertField(t, where+"Roll2", expected.Roll2, frame.Roll2.String())
	g.assertField(t, where+"Roll3", expected.Roll3, frame.Roll3.String())
	g.assertField(t, where+"Score", expected.Score, frame.Score.String())
	g.assertField(t, where+"TotalScore", expected.TotalScore, frame.TotalScore.String())
}

func (g *BowlingGlue) numberedFrame(t *testing.T, number string) production.Frame {
	for _, frame := range g.game.Frames() {
		if strconv.Itoa(frame.Number) == strings.TrimSpace(number) {
			return frame
		}
	}
	t.Fatalf("no frame numbered %s", number)
	return production.Frame{}
}

func (g *BowlingGlue) markedFrame(t *testing.T, frames []production.FrameMarks,
	number string) production.FrameMarks {
	for _, frame := range frames {
		if frame.Frame == strings.TrimSpace(number) {
			return frame
		}
	}
	t.Fatalf("no frame numbered %s", number)
	return production.FrameMarks{}
}

// assertField honours the ?DNC? marker the generated *String structs use.
func (g *BowlingGlue) assertField(t *testing.T, what, expected, actual string) {
	if expected == dncString {
		return
	}
	if strings.TrimSpace(expected) != strings.TrimSpace(actual) {
		t.Errorf("%s: expected %q but was %q", what,
			strings.TrimSpace(expected), strings.TrimSpace(actual))
	}
}

func (g *BowlingGlue) isTrue(text string) bool {
	switch strings.ToLower(strings.TrimSpace(text)) {
	case "yes", "true", "y", "1":
		return true
	}
	return false
}
