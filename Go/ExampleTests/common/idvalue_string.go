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
