package common

import "fmt"

type ShoppingCartString struct {
	Items string
	Shipping string
	Discount string
	TotalPrice string
	ShippingAddress AddressString
	BillingAddress AddressString
}

func NewShoppingCartStringFromSlice(v []string) ShoppingCartString {
	s := ShoppingCartString{}
	if len(v) > 0 { s.Items = v[0] }
	if len(v) > 1 { s.Shipping = v[1] }
	if len(v) > 2 { s.Discount = v[2] }
	if len(v) > 3 { s.TotalPrice = v[3] }
	return s
}

func (s ShoppingCartString) String() string {
	return fmt.Sprintf("Items=%s, Shipping=%s, Discount=%s, TotalPrice=%s, ShippingAddress=%v, BillingAddress=%v", s.Items, s.Shipping, s.Discount, s.TotalPrice, s.ShippingAddress, s.BillingAddress)
}

func (s ShoppingCartString) Equals(o ShoppingCartString) bool {
	return DNCEqual(s.Items, o.Items) &&
		DNCEqual(s.Shipping, o.Shipping) &&
		DNCEqual(s.Discount, o.Discount) &&
		DNCEqual(s.TotalPrice, o.TotalPrice) &&
		s.ShippingAddress.Equals(o.ShippingAddress) &&
		s.BillingAddress.Equals(o.BillingAddress)
}

func EqualShoppingCartStringSlices(a, b []ShoppingCartString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
