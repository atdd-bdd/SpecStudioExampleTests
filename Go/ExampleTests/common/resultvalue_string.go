package common

import "fmt"

type ResultValueString struct {
	Sum string
}

func NewResultValueStringFromSlice(v []string) ResultValueString {
	s := ResultValueString{}
	if len(v) > 0 { s.Sum = v[0] }
	return s
}

func (s ResultValueString) String() string {
	return fmt.Sprintf("Sum=%s", s.Sum)
}
