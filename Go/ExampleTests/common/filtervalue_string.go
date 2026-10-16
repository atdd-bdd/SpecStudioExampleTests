package common

type FilterValueString struct {
	Value IDFormString
}

func NewFilterValueStringFromSlice(v []string) FilterValueString {
	s := FilterValueString{}
	if len(v) > 0 { s.Value = IDFormString(v[0]) }
	return s
}

// NewFilterValueStringFromText builds from the text form, e.g. Money as "25 USD".
func NewFilterValueStringFromText(text string) FilterValueString {
	parts := RequireTokens(text, 1, "FilterValue")
	return FilterValueString{
		Value: IDFormString(parts[0]),
	}
}

func (s FilterValueString) String() string {
	return Token(string(s.Value))
}

func (s FilterValueString) Equals(o FilterValueString) bool {
	return DNCEqual(string(s.Value), string(o.Value))
}

func EqualFilterValueStringSlices(a, b []FilterValueString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
