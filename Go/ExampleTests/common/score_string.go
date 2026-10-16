package common

// ScoreString is Score as a table cell holds it: the unconverted
// text. It is a named string, so the cell reads as text wherever text is
// what is wanted -- string(v) -- and a generated signature still names the
// DataType the specification declared.
type ScoreString string

func NewScoreString(text string) ScoreString { return ScoreString(text) }

// Value is the cell's text.
func (v ScoreString) Value() string { return string(v) }

func (v ScoreString) String() string { return string(v) }
