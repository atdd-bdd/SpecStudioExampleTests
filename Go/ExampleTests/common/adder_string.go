package common

type AdderString struct {
	Number1 string
	Number2 string
	Result string
}

func NewAdderStringFromSlice(v []string) AdderString {
	s := AdderString{}
	if len(v) > 0 { s.Number1 = v[0] }
	if len(v) > 1 { s.Number2 = v[1] }
	if len(v) > 2 { s.Result = v[2] }
	return s
}

// NewAdderStringFromText builds from the text form, e.g. Money as "25 USD".
func NewAdderStringFromText(text string) AdderString {
	parts := RequireTokens(text, 3, "Adder")
	return AdderString{
		Number1: parts[0],
		Number2: parts[1],
		Result: parts[2],
	}
}

func (s AdderString) String() string {
	return Token(s.Number1) + " " + Token(s.Number2) + " " + Token(s.Result)
}

func (s AdderString) Equals(o AdderString) bool {
	return DNCEqual(s.Number1, o.Number1) &&
		DNCEqual(s.Number2, o.Number2) &&
		DNCEqual(s.Result, o.Result)
}

func EqualAdderStringSlices(a, b []AdderString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
