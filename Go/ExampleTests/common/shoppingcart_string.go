package common

import "fmt"

type ShoppingCartString struct {
	Items string
	Shipping string
	Discount string
	TotalPrice string
	ShippingAddress string
	BillingAddress string
}

func NewShoppingCartStringFromSlice(v []string) ShoppingCartString {
	s := ShoppingCartString{}
	if len(v) > 0 { s.Items = v[0] }
	if len(v) > 1 { s.Shipping = v[1] }
	if len(v) > 2 { s.Discount = v[2] }
	if len(v) > 3 { s.TotalPrice = v[3] }
	if len(v) > 4 { s.ShippingAddress = v[4] }
	if len(v) > 5 { s.BillingAddress = v[5] }
	return s
}

func (s ShoppingCartString) String() string {
	return fmt.Sprintf("Items=%s, Shipping=%s, Discount=%s, TotalPrice=%s, ShippingAddress=%s, BillingAddress=%s", s.Items, s.Shipping, s.Discount, s.TotalPrice, s.ShippingAddress, s.BillingAddress)
}
