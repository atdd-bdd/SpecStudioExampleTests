package production

import (
	"strconv"
	"strings"
)

const framesInAGame = 10

// Frame is one frame's rolls as the scoresheet shows them, plus its score.
//
// Roll1..Roll3 are the three rolls starting at this frame's first roll -- not
// only the rolls bowled in this frame. After a strike, Roll2 and Roll3 are the
// next frame's rolls, because those are what score this one. The spec's
// FrameValues table is written that way: frame 4 is a strike and still lists
// Roll2 and Roll3 as the two rolls that follow it.
type Frame struct {
	Number     int
	Roll1      Pins
	Roll2      Pins
	Roll3      Pins
	Score      Score
	TotalScore Score
}

func (f Frame) IsStrike() bool { return f.Roll1.IsStrike() }

// IsSpare only counts when the frame is not already a strike.
func (f Frame) IsSpare() bool {
	return !f.IsStrike() && f.Roll1.IsRolled() && f.Roll2.IsRolled() &&
		f.Roll1.Count()+f.Roll2.Count() == PinsMax
}

// FrameMarks is how one frame is written on a scoresheet: X for a strike, / for
// a spare, - for a gutter ball, blank for a roll not yet made.
//
// Mark3 is only ever filled on the tenth frame, the only frame that can have a
// third roll of its own.
type FrameMarks struct {
	Frame      string
	Mark1      string
	Mark2      string
	Mark3      string
	TotalScore string
}

// Marks is the mark columns joined, as they appear in the top row of the
// display.
func (m FrameMarks) Marks() string { return m.Mark1 + m.Mark2 + m.Mark3 }

// InputControl is where the next roll goes, and how many pins are standing for
// it -- what a keypad needs in order to disable the buttons that cannot be
// pressed.
type InputControl struct {
	Frame     int
	Roll      int
	Remaining int
}

// BowlingGame is a game of ten-pin bowling: the rolls made so far, the
// scoresheet they produce, and what the next roll is allowed to be.
//
// All the scoring lives here rather than in the test glue. The glue's job is to
// hand rolls in and read values out.
type BowlingGame struct {
	rolls []int

	// True when the game was seeded with the tenth frame's rolls alone, so the
	// tenth frame can be examined without bowling the nine before it. The
	// earlier frames then have no rolls, which is why their scores -- and every
	// running total -- stay TBS.
	tenthFrameOnly bool
}

func NewBowlingGame() *BowlingGame { return &BowlingGame{} }

func (g *BowlingGame) Rolls() []int {
	return append([]int(nil), g.rolls...)
}

// SetRolls replaces the rolls outright. Setup, not play -- no validation.
func (g *BowlingGame) SetRolls(pinCounts []int) {
	g.rolls = append([]int(nil), pinCounts...)
	g.tenthFrameOnly = false
}

// SetTenthFrameRolls seeds only the tenth frame; frames 1..9 are left unbowled.
func (g *BowlingGame) SetTenthFrameRolls(pinCounts []int) {
	g.rolls = append([]int(nil), pinCounts...)
	g.tenthFrameOnly = true
}

// AddRoll bowls one roll. It returns false and changes nothing when the roll is
// impossible -- more pins than are standing, or a game already over.
func (g *BowlingGame) AddRoll(pinCount int) bool {
	if pinCount < 0 || pinCount > PinsMax {
		return false
	}
	if g.IsComplete() {
		return false
	}
	if pinCount > g.InputControl().Remaining {
		return false
	}
	g.rolls = append(g.rolls, pinCount)
	return true
}

// Score recomputes the scoresheet. Scoring is derived on demand, so this exists
// to give the specification's "When scored" step something real to drive.
func (g *BowlingGame) Score() { g.Frames() }

// ---- scoresheet ------------------------------------------------------------

func (g *BowlingGame) Frames() []Frame {
	var result []Frame
	starts := g.frameStarts()
	running := 0
	runningKnown := true

	for f := 1; f <= framesInAGame; f++ {
		start := starts[f]
		roll1 := g.pinsAt(start)
		roll2 := g.pinsAt(start + 1)
		roll3 := g.pinsAt(start + 2)

		strike := roll1.IsStrike()
		spare := !strike && roll1.IsRolled() && roll2.IsRolled() &&
			roll1.Count()+roll2.Count() == PinsMax

		// A strike or a spare is only worth what the following rolls make it, so
		// it needs three rolls before it can be scored at all.
		needed := 2
		if strike || spare {
			needed = 3
		}

		score, total := TBSScore, TBSScore
		if g.allRolled(start, needed) {
			points := roll1.Count() + roll2.Count()
			if needed == 3 {
				points += roll3.Count()
			}
			score = ScoreFromPoints(points)
			if runningKnown {
				running += points
				total = ScoreFromPoints(running)
			}
		} else {
			// Once one frame cannot be scored, no later total can be either.
			runningKnown = false
		}

		result = append(result, Frame{f, roll1, roll2, roll3, score, total})
	}
	return result
}

func (g *BowlingGame) Marks() []FrameMarks {
	var result []FrameMarks

	for _, frame := range g.Frames() {
		mark1, mark2, mark3 := "", "", ""

		if frame.Roll1.IsRolled() {
			if frame.Roll1.IsStrike() {
				mark1 = "X"
			} else {
				mark1 = digit(frame.Roll1)
			}
		}

		if frame.Number < framesInAGame {
			// Frames 1..9 show only their own two rolls; after a strike there is
			// no second mark, even though Roll2 holds the next frame's roll.
			if !frame.Roll1.IsStrike() && frame.Roll1.IsRolled() && frame.Roll2.IsRolled() {
				if frame.Roll1.Count()+frame.Roll2.Count() == PinsMax {
					mark2 = "/"
				} else {
					mark2 = digit(frame.Roll2)
				}
			}
		} else {
			if frame.Roll2.IsRolled() {
				if frame.Roll1.IsStrike() {
					if frame.Roll2.IsStrike() {
						mark2 = "X"
					} else {
						mark2 = digit(frame.Roll2)
					}
				} else if frame.Roll1.Count()+frame.Roll2.Count() == PinsMax {
					mark2 = "/"
				} else {
					mark2 = digit(frame.Roll2)
				}
			}
			if frame.Roll3.IsRolled() {
				spareOnBonus := frame.Roll1.IsStrike() && !frame.Roll2.IsStrike() &&
					frame.Roll2.Count()+frame.Roll3.Count() == PinsMax
				switch {
				case spareOnBonus:
					mark3 = "/"
				case frame.Roll3.IsStrike():
					mark3 = "X"
				default:
					mark3 = digit(frame.Roll3)
				}
			}
		}

		total := ""
		if frame.TotalScore.IsComputable() {
			total = frame.TotalScore.String()
		}
		result = append(result, FrameMarks{strconv.Itoa(frame.Number), mark1, mark2, mark3, total})
	}
	return result
}

// Display is the scoresheet as two rows: marks above, running totals below.
//
// Each frame's column is as wide as the wider of its two cells, so a frame whose
// total reaches three digits widens both rows together and the columns stay
// aligned under each other.
//
// Two rows, no trailing newline: that is what the docstring in the specification
// holds, and it is compared as text.
func (g *BowlingGame) Display() string {
	var top, bottom strings.Builder

	for _, frame := range g.Marks() {
		width := len(frame.Marks())
		if len(frame.TotalScore) > width {
			width = len(frame.TotalScore)
		}
		top.WriteString("| " + padRight(frame.Marks(), width) + " ")
		bottom.WriteString("| " + padRight(frame.TotalScore, width) + " ")
	}
	return top.String() + "|\n" + bottom.String() + "|"
}

// ---- state -----------------------------------------------------------------

// IsComplete is true once the tenth frame has had every roll it is entitled to.
func (g *BowlingGame) IsComplete() bool {
	start := g.frameStarts()[framesInAGame]
	roll1 := g.pinsAt(start)
	roll2 := g.pinsAt(start + 1)
	if !roll1.IsRolled() || !roll2.IsRolled() {
		return false
	}

	strike := roll1.IsStrike()
	spare := !strike && roll1.Count()+roll2.Count() == PinsMax
	if strike || spare {
		return g.pinsAt(start + 2).IsRolled()
	}
	return true
}

// InputControl says which frame and roll the next ball belongs to, and how many
// pins stand.
func (g *BowlingGame) InputControl() InputControl {
	starts := g.frameStarts()

	for f := 1; f < framesInAGame; f++ {
		start := starts[f]
		roll1 := g.pinsAt(start)
		if !roll1.IsRolled() {
			return InputControl{f, 1, PinsMax}
		}
		if roll1.IsStrike() {
			continue // one roll ends the frame
		}
		if !g.pinsAt(start + 1).IsRolled() {
			return InputControl{f, 2, PinsMax - roll1.Count()}
		}
	}

	start := starts[framesInAGame]
	roll1 := g.pinsAt(start)
	roll2 := g.pinsAt(start + 1)
	if !roll1.IsRolled() {
		return InputControl{framesInAGame, 1, PinsMax}
	}
	if !roll2.IsRolled() {
		remaining := PinsMax
		if !roll1.IsStrike() {
			remaining = PinsMax - roll1.Count()
		}
		return InputControl{framesInAGame, 2, remaining}
	}

	// Third roll of the tenth. After two strikes the rack is full again; after a
	// strike then a non-strike, only what that ball left standing; after a
	// spare, a fresh rack.
	remaining := PinsMax
	if roll1.IsStrike() && !roll2.IsStrike() {
		remaining = PinsMax - roll2.Count()
	}
	return InputControl{framesInAGame, 3, remaining}
}

// ---- helpers ---------------------------------------------------------------

// frameStarts is the index of each frame's first roll. A strike ends a frame in
// one roll, so the next frame starts one later rather than two.
func (g *BowlingGame) frameStarts() []int {
	starts := make([]int, framesInAGame+1)

	if g.tenthFrameOnly {
		// Frames 1..9 are unbowled: point them past every roll so each one reads
		// back as TBR.
		for f := 1; f < framesInAGame; f++ {
			starts[f] = len(g.rolls) + framesInAGame*2
		}
		starts[framesInAGame] = 0
		return starts
	}

	index := 0
	for f := 1; f < framesInAGame; f++ {
		starts[f] = index
		if index < len(g.rolls) && g.rolls[index] == PinsMax {
			index++
		} else {
			index += 2
		}
	}
	starts[framesInAGame] = index
	return starts
}

func (g *BowlingGame) pinsAt(index int) Pins {
	if index < 0 || index >= len(g.rolls) {
		return TBRPins
	}
	return PinsFromCount(g.rolls[index])
}

func (g *BowlingGame) allRolled(start, count int) bool {
	for i := 0; i < count; i++ {
		if !g.pinsAt(start + i).IsRolled() {
			return false
		}
	}
	return true
}

// digit writes a gutter ball as a dash, not a zero.
func digit(pins Pins) string {
	if pins.Count() == 0 {
		return "-"
	}
	return strconv.Itoa(pins.Count())
}

func padRight(text string, width int) string {
	for len(text) < width {
		text += " "
	}
	return text
}
