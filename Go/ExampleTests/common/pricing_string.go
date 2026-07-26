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
