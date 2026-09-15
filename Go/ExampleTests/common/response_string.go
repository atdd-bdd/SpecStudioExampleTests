package common

type ResponseString struct {
	Result ResultString
}

func NewResponseStringFromSlice(v []string) ResponseString {
	s := ResponseString{}
	if len(v) > 0 { s.Result = NewResultStringFromText(v[0]) }
	return s
}

// NewResponseStringFromText builds from the text form, e.g. Money as "25 USD".
func NewResponseStringFromText(text string) ResponseString {
	parts := RequireTokens(text, 1, "Response")
	return ResponseString{
		Result: NewResultStringFromText(parts[0]),
	}
}

func (s ResponseString) String() string {
	return Nested(s.Result.String())
}

func (s ResponseString) Equals(o ResponseString) bool {
	return s.Result.Equals(o.Result)
}

func EqualResponseStringSlices(a, b []ResponseString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
