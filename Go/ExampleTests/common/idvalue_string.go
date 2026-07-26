package common

import "fmt"

type IDValueString struct {
	ID string
	Value string
}

func NewIDValueStringFromSlice(v []string) IDValueString {
	s := IDValueString{}
	if len(v) > 0 { s.ID = v[0] }
	if len(v) > 1 { s.Value = v[1] }
	return s
}

func (s IDValueString) String() string {
	return fmt.Sprintf("ID=%s, Value=%s", s.ID, s.Value)
}

func (s IDValueString) Equals(o IDValueString) bool {
	return DNCEqual(s.ID, o.ID) &&
		DNCEqual(s.Value, o.Value)
}

func EqualIDValueStringSlices(a, b []IDValueString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
