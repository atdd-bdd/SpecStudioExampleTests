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

func (s ResultValueString) Equals(o ResultValueString) bool {
	return DNCEqual(s.Sum, o.Sum)
}

func EqualResultValueStringSlices(a, b []ResultValueString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
