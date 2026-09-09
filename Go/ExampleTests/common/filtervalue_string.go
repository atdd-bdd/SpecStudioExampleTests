package common

type FilterValueString struct {
	Value string
}

func NewFilterValueStringFromSlice(v []string) FilterValueString {
	s := FilterValueString{}
	if len(v) > 0 { s.Value = v[0] }
	return s
}

// NewFilterValueStringFromText builds from the text form, e.g. Money as "25 USD".
func NewFilterValueStringFromText(text string) FilterValueString {
	parts := RequireTokens(text, 1, "FilterValue")
	return FilterValueString{
		Value: parts[0],
	}
}

func (s FilterValueString) String() string {
	return Token(s.Value)
}

func (s FilterValueString) Equals(o FilterValueString) bool {
	return DNCEqual(s.Value, o.Value)
}

func EqualFilterValueStringSlices(a, b []FilterValueString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
