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
