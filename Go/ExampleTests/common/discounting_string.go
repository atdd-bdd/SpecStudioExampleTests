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

func (s DiscountingString) Equals(o DiscountingString) bool {
	return DNCEqual(s.TotalPrice, o.TotalPrice) &&
		DNCEqual(s.Discount, o.Discount) &&
		DNCEqual(s.Notes, o.Notes)
}

func EqualDiscountingStringSlices(a, b []DiscountingString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
