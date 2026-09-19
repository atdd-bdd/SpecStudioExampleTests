package production

import (
	"fmt"
	"strconv"
	"strings"
)

// PinsTBR marks a roll that has not been made: the integer the spec defines TBR as.
const PinsTBR = -1

// PinsMax is a full rack.
const PinsMax = 10

// Pins is the number of pins knocked down by one roll, or -1 (TBR) when the roll has
// not happened yet.
//
// The spec's ValidValues table is the contract: 0 and 10 are valid, 11 and -2
// are not, and -1 -- the spec's =TBR -- is valid because a scoresheet shows rolls that
// are still to come. NewPins refuses exactly the invalid ones, so a number out
// of range fails the same way an unparseable one does.
type Pins struct {
	Value int
}

// TBRPins is the value a roll not yet made carries.
var TBRPins = Pins{Value: PinsTBR}

// NewPins reads the text form a table cell holds, and refuses anything that is
// not TBR or a count from 0 to 10.
func NewPins(text string) (Pins, error) {
	count, err := strconv.Atoi(strings.TrimSpace(text))
	if err != nil {
		return Pins{}, fmt.Errorf("not a number of pins: %s", text)
	}
	if count != PinsTBR && (count < 0 || count > PinsMax) {
		return Pins{}, fmt.Errorf("roll must be between 0 and %d, got %d", PinsMax, count)
	}
	return Pins{Value: count}, nil
}

// PinsFromCount is the roll of a count already known to be in range.
func PinsFromCount(count int) Pins {
	return Pins{Value: count}
}

// IsRolled is false when this is TBR -- the roll has not been made.
func (p Pins) IsRolled() bool { return p.Value != PinsTBR }

// Count is the pin count, or -1 when the roll has not been made.
func (p Pins) Count() int { return p.Value }

func (p Pins) IsStrike() bool { return p.IsRolled() && p.Value == PinsMax }

// String is the text form: what a table cell holds.
func (p Pins) String() string { return strconv.Itoa(p.Value) }
