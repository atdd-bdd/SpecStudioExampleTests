package common

// DollarString is Dollar as a table cell holds it: the unconverted
// text. It is a named string, so the cell reads as text wherever text is
// what is wanted -- string(v) -- and a generated signature still names the
// DataType the specification declared.
type DollarString string

func NewDollarString(text string) DollarString { return DollarString(text) }

// Value is the cell's text.
func (v DollarString) Value() string { return string(v) }

func (v DollarString) String() string { return string(v) }
