package common

import "fmt"

type ShippingInputString struct {
	TotalPrice string
	ShippingCost string
	Notes string
}

func NewShippingInputStringFromSlice(v []string) ShippingInputString {
	s := ShippingInputString{}
	if len(v) > 0 { s.TotalPrice = v[0] }
	if len(v) > 1 { s.ShippingCost = v[1] }
	if len(v) > 2 { s.Notes = v[2] }
	return s
}

func (s ShippingInputString) String() string {
	return fmt.Sprintf("Total Price=%s, Shipping Cost=%s, Notes=%s", s.TotalPrice, s.ShippingCost, s.Notes)
}

func (s ShippingInputString) Equals(o ShippingInputString) bool {
	return DNCEqual(s.TotalPrice, o.TotalPrice) &&
		DNCEqual(s.ShippingCost, o.ShippingCost) &&
		DNCEqual(s.Notes, o.Notes)
}

func EqualShippingInputStringSlices(a, b []ShippingInputString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
