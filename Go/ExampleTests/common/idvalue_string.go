package common

type IDValueString struct {
	ID string
	Value string
}

func NewIDValueStringFromSlice(v []string) IDValueString {
	s := IDValueString{}
	if len(v) > 0 { s.ID = v[0] }
	if len(v) > 1 { s.Value = v[1] }
	return s
}

// NewIDValueStringFromText builds from the text form, e.g. Money as "25 USD".
func NewIDValueStringFromText(text string) IDValueString {
	parts := RequireTokens(text, 2, "IDValue")
	return IDValueString{
		ID: parts[0],
		Value: parts[1],
	}
}

func (s IDValueString) String() string {
	return Token(s.ID) + " " + Token(s.Value)
}

func (s IDValueString) Equals(o IDValueString) bool {
	return DNCEqual(s.ID, o.ID) &&
		DNCEqual(s.Value, o.Value)
}

func EqualIDValueStringSlices(a, b []IDValueString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
