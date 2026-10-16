package common

// PercentageString is Percentage as a table cell holds it: the unconverted
// text. It is a named string, so the cell reads as text wherever text is
// what is wanted -- string(v) -- and a generated signature still names the
// DataType the specification declared.
type PercentageString string

func NewPercentageString(text string) PercentageString { return PercentageString(text) }

// Value is the cell's text.
func (v PercentageString) Value() string { return string(v) }

func (v PercentageString) String() string { return string(v) }
