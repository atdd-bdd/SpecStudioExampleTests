package common

// IDFormString is IDForm as a table cell holds it: the unconverted
// text. It is a named string, so the cell reads as text wherever text is
// what is wanted -- string(v) -- and a generated signature still names the
// DataType the specification declared.
type IDFormString string

func NewIDFormString(text string) IDFormString { return IDFormString(text) }

// Value is the cell's text.
func (v IDFormString) Value() string { return string(v) }

func (v IDFormString) String() string { return string(v) }
