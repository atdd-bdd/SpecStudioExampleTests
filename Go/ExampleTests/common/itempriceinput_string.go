package common

import "fmt"

type ItemPriceInputString struct {
	TotalItems string
}

func NewItemPriceInputStringFromSlice(v []string) ItemPriceInputString {
	s := ItemPriceInputString{}
	if len(v) > 0 { s.TotalItems = v[0] }
	return s
}

func (s ItemPriceInputString) String() string {
	return fmt.Sprintf("TotalItems=%s", s.TotalItems)
}

func (s ItemPriceInputString) Equals(o ItemPriceInputString) bool {
	return DNCEqual(s.TotalItems, o.TotalItems)
}

func EqualItemPriceInputStringSlices(a, b []ItemPriceInputString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
