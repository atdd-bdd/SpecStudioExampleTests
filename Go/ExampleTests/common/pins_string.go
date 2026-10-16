package common

// PinsString is Pins as a table cell holds it: the unconverted
// text. It is a named string, so the cell reads as text wherever text is
// what is wanted -- string(v) -- and a generated signature still names the
// DataType the specification declared.
type PinsString string

func NewPinsString(text string) PinsString { return PinsString(text) }

// Value is the cell's text.
func (v PinsString) Value() string { return string(v) }

func (v PinsString) String() string { return string(v) }
