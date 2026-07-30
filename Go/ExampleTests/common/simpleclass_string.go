package common

import "fmt"

type SimpleClassString struct {
	AnInt string
	AString string
}

func NewSimpleClassStringFromSlice(v []string) SimpleClassString {
	s := SimpleClassString{}
	if len(v) > 0 { s.AnInt = v[0] }
	if len(v) > 1 { s.AString = v[1] }
	return s
}

func (s SimpleClassString) String() string {
	return fmt.Sprintf("anInt=%s, aString=%s", s.AnInt, s.AString)
}

func (s SimpleClassString) Equals(o SimpleClassString) bool {
	return DNCEqual(s.AnInt, o.AnInt) &&
		DNCEqual(s.AString, o.AString)
}

func EqualSimpleClassStringSlices(a, b []SimpleClassString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
