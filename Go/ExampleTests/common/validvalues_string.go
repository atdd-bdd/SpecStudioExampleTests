package common

type ValidValuesString struct {
	Value string
	IsValid string
	Notes string
}

func NewValidValuesStringFromSlice(v []string) ValidValuesString {
	s := ValidValuesString{}
	if len(v) > 0 { s.Value = v[0] }
	if len(v) > 1 { s.IsValid = v[1] }
	if len(v) > 2 { s.Notes = v[2] }
	return s
}

// NewValidValuesStringFromText builds from the text form, e.g. Money as "25 USD".
func NewValidValuesStringFromText(text string) ValidValuesString {
	parts := RequireTokens(text, 3, "ValidValues")
	return ValidValuesString{
		Value: parts[0],
		IsValid: parts[1],
		Notes: parts[2],
	}
}

func (s ValidValuesString) String() string {
	return Token(s.Value) + " " + Token(s.IsValid) + " " + Token(s.Notes)
}

func (s ValidValuesString) Equals(o ValidValuesString) bool {
	return DNCEqual(s.Value, o.Value) &&
		DNCEqual(s.IsValid, o.IsValid) &&
		DNCEqual(s.Notes, o.Notes)
}

func EqualValidValuesStringSlices(a, b []ValidValuesString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
