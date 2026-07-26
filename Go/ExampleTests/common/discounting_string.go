package common

import "fmt"

type DiscountingString struct {
	TotalPrice string
	Discount string
	Notes string
}

func NewDiscountingStringFromSlice(v []string) DiscountingString {
	s := DiscountingString{}
	if len(v) > 0 { s.TotalPrice = v[0] }
	if len(v) > 1 { s.Discount = v[1] }
	if len(v) > 2 { s.Notes = v[2] }
	return s
}

func (s DiscountingString) String() string {
	return fmt.Sprintf("Total Price=%s, Discount=%s, Notes=%s", s.TotalPrice, s.Discount, s.Notes)
}
