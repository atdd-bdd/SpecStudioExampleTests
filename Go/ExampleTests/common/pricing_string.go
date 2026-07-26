package common

import "fmt"

type PricingString struct {
	TotalPrice string
}

func NewPricingStringFromSlice(v []string) PricingString {
	s := PricingString{}
	if len(v) > 0 { s.TotalPrice = v[0] }
	return s
}

func (s PricingString) String() string {
	return fmt.Sprintf("TotalPrice=%s", s.TotalPrice)
}

func (s PricingString) Equals(o PricingString) bool {
	return DNCEqual(s.TotalPrice, o.TotalPrice)
}

func EqualPricingStringSlices(a, b []PricingString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
