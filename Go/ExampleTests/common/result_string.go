package common

type ResultString struct {
	AddressMatches string
}

func NewResultStringFromSlice(v []string) ResultString {
	s := ResultString{}
	if len(v) > 0 { s.AddressMatches = v[0] }
	return s
}

// NewResultStringFromText builds from the text form, e.g. Money as "25 USD".
func NewResultStringFromText(text string) ResultString {
	parts := RequireTokens(text, 1, "Result")
	return ResultString{
		AddressMatches: parts[0],
	}
}

func (s ResultString) String() string {
	return Token(s.AddressMatches)
}

func (s ResultString) Equals(o ResultString) bool {
	return DNCEqual(s.AddressMatches, o.AddressMatches)
}

func EqualResultStringSlices(a, b []ResultString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
