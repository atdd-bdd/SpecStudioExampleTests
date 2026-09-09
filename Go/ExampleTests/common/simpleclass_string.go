package common

type SimpleClassString struct {
	AnInt string
	AString string
}

func NewSimpleClassStringFromSlice(v []string) SimpleClassString {
	s := SimpleClassString{}
	if len(v) > 0 { s.AnInt = v[0] }
	if len(v) > 1 { s.AString = v[1] }
	return s
}

// NewSimpleClassStringFromText builds from the text form, e.g. Money as "25 USD".
func NewSimpleClassStringFromText(text string) SimpleClassString {
	parts := RequireTokens(text, 2, "SimpleClass")
	return SimpleClassString{
		AnInt: parts[0],
		AString: parts[1],
	}
}

func (s SimpleClassString) String() string {
	return Token(s.AnInt) + " " + Token(s.AString)
}

func (s SimpleClassString) Equals(o SimpleClassString) bool {
	return DNCEqual(s.AnInt, o.AnInt) &&
		DNCEqual(s.AString, o.AString)
}

func EqualSimpleClassStringSlices(a, b []SimpleClassString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
