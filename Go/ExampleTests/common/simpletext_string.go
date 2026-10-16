package common

// SimpleTextString is SimpleText as a table cell holds it: the unconverted
// text. It is a named string, so the cell reads as text wherever text is
// what is wanted -- string(v) -- and a generated signature still names the
// DataType the specification declared.
type SimpleTextString string

func NewSimpleTextString(text string) SimpleTextString { return SimpleTextString(text) }

// Value is the cell's text.
func (v SimpleTextString) Value() string { return string(v) }

func (v SimpleTextString) String() string { return string(v) }
