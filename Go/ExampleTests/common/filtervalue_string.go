package common

import "fmt"

type FilterValueString struct {
	Value string
}

func NewFilterValueStringFromSlice(v []string) FilterValueString {
	s := FilterValueString{}
	if len(v) > 0 { s.Value = v[0] }
	return s
}

func (s FilterValueString) String() string {
	return fmt.Sprintf("Value=%s", s.Value)
}
