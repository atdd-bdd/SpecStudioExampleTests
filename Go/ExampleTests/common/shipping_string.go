package common

import "fmt"

type ShippingString struct {
	TotalPrice string
	ShippingCost string
	Notes string
}

func NewShippingStringFromSlice(v []string) ShippingString {
	s := ShippingString{}
	if len(v) > 0 { s.TotalPrice = v[0] }
	if len(v) > 1 { s.ShippingCost = v[1] }
	if len(v) > 2 { s.Notes = v[2] }
	return s
}

func (s ShippingString) String() string {
	return fmt.Sprintf("Total Price=%s, Shipping Cost=%s, Notes=%s", s.TotalPrice, s.ShippingCost, s.Notes)
}
