package common

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
	if len(v) > 4 { s.ShippingAddress = NewAddressStringFromText(v[4]) }
	if len(v) > 5 { s.BillingAddress = NewAddressStringFromText(v[5]) }
	return s
}

// NewShoppingCartStringFromText builds from the text form, e.g. Money as "25 USD".
func NewShoppingCartStringFromText(text string) ShoppingCartString {
	parts := RequireTokens(text, 6, "ShoppingCart")
	return ShoppingCartString{
		Items: parts[0],
		Shipping: parts[1],
		Discount: parts[2],
		TotalPrice: parts[3],
		ShippingAddress: NewAddressStringFromText(parts[4]),
		BillingAddress: NewAddressStringFromText(parts[5]),
	}
}

func (s ShoppingCartString) String() string {
	return Token(s.Items) + " " + Token(s.Shipping) + " " + Token(s.Discount) + " " + Token(s.TotalPrice) + " " + Nested(s.ShippingAddress.String()) + " " + Nested(s.BillingAddress.String())
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
