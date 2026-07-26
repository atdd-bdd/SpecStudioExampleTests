package common

import "fmt"

type CartInputString struct {
	TotalItems string
	Shipping string
	Discount string
	TotalPrice string
	Notes string
}

func NewCartInputStringFromSlice(v []string) CartInputString {
	s := CartInputString{}
	if len(v) > 0 { s.TotalItems = v[0] }
	if len(v) > 1 { s.Shipping = v[1] }
	if len(v) > 2 { s.Discount = v[2] }
	if len(v) > 3 { s.TotalPrice = v[3] }
	if len(v) > 4 { s.Notes = v[4] }
	return s
}

func (s CartInputString) String() string {
	return fmt.Sprintf("TotalItems=%s, Shipping=%s, Discount=%s, Total Price=%s, Notes=%s", s.TotalItems, s.Shipping, s.Discount, s.TotalPrice, s.Notes)
}

func (s CartInputString) Equals(o CartInputString) bool {
	return DNCEqual(s.TotalItems, o.TotalItems) &&
		DNCEqual(s.Shipping, o.Shipping) &&
		DNCEqual(s.Discount, o.Discount) &&
		DNCEqual(s.TotalPrice, o.TotalPrice) &&
		DNCEqual(s.Notes, o.Notes)
}

func EqualCartInputStringSlices(a, b []CartInputString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
