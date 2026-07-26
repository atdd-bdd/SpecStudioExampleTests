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
