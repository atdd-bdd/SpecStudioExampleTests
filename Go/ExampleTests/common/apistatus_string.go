package common

type ApiStatusString struct {
	Code string
}

func NewApiStatusStringFromSlice(v []string) ApiStatusString {
	s := ApiStatusString{}
	if len(v) > 0 { s.Code = v[0] }
	return s
}

// NewApiStatusStringFromText builds from the text form, e.g. Money as "25 USD".
func NewApiStatusStringFromText(text string) ApiStatusString {
	parts := RequireTokens(text, 1, "ApiStatus")
	return ApiStatusString{
		Code: parts[0],
	}
}

func (s ApiStatusString) String() string {
	return Token(s.Code)
}

func (s ApiStatusString) Equals(o ApiStatusString) bool {
	return DNCEqual(s.Code, o.Code)
}

func EqualApiStatusStringSlices(a, b []ApiStatusString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
