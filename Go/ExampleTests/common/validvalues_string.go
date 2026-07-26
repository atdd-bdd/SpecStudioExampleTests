package common

import "fmt"

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

func (s ValidValuesString) String() string {
	return fmt.Sprintf("Value=%s, IsValid=%s, Notes=%s", s.Value, s.IsValid, s.Notes)
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
