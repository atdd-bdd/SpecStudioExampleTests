package common

import "fmt"

type AdderString struct {
	Number1 string
	Number2 string
	Result string
}

func NewAdderStringFromSlice(v []string) AdderString {
	s := AdderString{}
	if len(v) > 0 { s.Number1 = v[0] }
	if len(v) > 1 { s.Number2 = v[1] }
	if len(v) > 2 { s.Result = v[2] }
	return s
}

func (s AdderString) String() string {
	return fmt.Sprintf("number1=%s, number2=%s, result=%s", s.Number1, s.Number2, s.Result)
}

func (s AdderString) Equals(o AdderString) bool {
	return DNCEqual(s.Number1, o.Number1) &&
		DNCEqual(s.Number2, o.Number2) &&
		DNCEqual(s.Result, o.Result)
}

func EqualAdderStringSlices(a, b []AdderString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
