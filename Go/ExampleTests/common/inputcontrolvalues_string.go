package common

type InputControlValuesString struct {
	Frame string
	Roll string
	Remaining string
}

func NewInputControlValuesStringFromSlice(v []string) InputControlValuesString {
	s := InputControlValuesString{}
	if len(v) > 0 { s.Frame = v[0] }
	if len(v) > 1 { s.Roll = v[1] }
	if len(v) > 2 { s.Remaining = v[2] }
	return s
}

// NewInputControlValuesStringFromText builds from the text form, e.g. Money as "25 USD".
func NewInputControlValuesStringFromText(text string) InputControlValuesString {
	parts := RequireTokens(text, 3, "InputControlValues")
	return InputControlValuesString{
		Frame: parts[0],
		Roll: parts[1],
		Remaining: parts[2],
	}
}

func (s InputControlValuesString) String() string {
	return Token(s.Frame) + " " + Token(s.Roll) + " " + Token(s.Remaining)
}

func (s InputControlValuesString) Equals(o InputControlValuesString) bool {
	return DNCEqual(s.Frame, o.Frame) &&
		DNCEqual(s.Roll, o.Roll) &&
		DNCEqual(s.Remaining, o.Remaining)
}

func EqualInputControlValuesStringSlices(a, b []InputControlValuesString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
