package common

type StatusString struct {
	Code string
}

func NewStatusStringFromSlice(v []string) StatusString {
	s := StatusString{}
	if len(v) > 0 { s.Code = v[0] }
	return s
}

// NewStatusStringFromText builds from the text form, e.g. Money as "25 USD".
func NewStatusStringFromText(text string) StatusString {
	parts := RequireTokens(text, 1, "Status")
	return StatusString{
		Code: parts[0],
	}
}

func (s StatusString) String() string {
	return Token(s.Code)
}

func (s StatusString) Equals(o StatusString) bool {
	return DNCEqual(s.Code, o.Code)
}

func EqualStatusStringSlices(a, b []StatusString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
