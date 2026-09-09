package common

type ResultValueString struct {
	Sum string
}

func NewResultValueStringFromSlice(v []string) ResultValueString {
	s := ResultValueString{}
	if len(v) > 0 { s.Sum = v[0] }
	return s
}

// NewResultValueStringFromText builds from the text form, e.g. Money as "25 USD".
func NewResultValueStringFromText(text string) ResultValueString {
	parts := RequireTokens(text, 1, "ResultValue")
	return ResultValueString{
		Sum: parts[0],
	}
}

func (s ResultValueString) String() string {
	return Token(s.Sum)
}

func (s ResultValueString) Equals(o ResultValueString) bool {
	return DNCEqual(s.Sum, o.Sum)
}

func EqualResultValueStringSlices(a, b []ResultValueString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
