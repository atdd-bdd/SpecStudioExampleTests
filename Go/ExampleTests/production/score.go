package production

import (
	"fmt"
	"strconv"
	"strings"
)

// ScoreTBS marks a score that cannot be computed yet: the integer the spec defines TBS as.
const ScoreTBS = -1

const (
	ScoreMin = 0
	ScoreMax = 300
)

// Score is a frame score or running total, or -1 (TBS) while the rolls it depends on
// have not all been made.
//
// The spec's ValidValues table bounds it at 0..300 -- 300 being a perfect game
// -- and rejects 301; -1 is valid only because the spec defines TBS as -1:
// a frame ending in a strike or a spare cannot be scored until its bonus rolls
// exist, and "not yet computable" is a normal state rather than an error.
type Score struct {
	Value int
}

// TBSScore is the value a frame not yet scorable carries.
var TBSScore = Score{Value: ScoreTBS}

// NewScore reads the text form a table cell holds, and refuses anything that
// is not TBS or a total from 0 to 300.
func NewScore(text string) (Score, error) {
	points, err := strconv.Atoi(strings.TrimSpace(text))
	if err != nil {
		return Score{}, fmt.Errorf("not a score: %s", text)
	}
	if points != ScoreTBS && (points < ScoreMin || points > ScoreMax) {
		return Score{}, fmt.Errorf("score must be between %d and %d, got %d",
			ScoreMin, ScoreMax, points)
	}
	return Score{Value: points}, nil
}

// ScoreFromPoints is the score of a total already known to be in range.
func ScoreFromPoints(points int) Score {
	return Score{Value: points}
}

func (s Score) IsComputable() bool { return s.Value != ScoreTBS }

// Points is the total, or -1 when not yet computable.
func (s Score) Points() int { return s.Value }

// String is the text form: what a table cell holds.
func (s Score) String() string { return strconv.Itoa(s.Value) }
