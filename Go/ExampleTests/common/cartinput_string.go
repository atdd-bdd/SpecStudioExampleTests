package common

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

// NewCartInputStringFromText builds from the text form, e.g. Money as "25 USD".
func NewCartInputStringFromText(text string) CartInputString {
	parts := RequireTokens(text, 5, "CartInput")
	return CartInputString{
		TotalItems: parts[0],
		Shipping: parts[1],
		Discount: parts[2],
		TotalPrice: parts[3],
		Notes: parts[4],
	}
}

func (s CartInputString) String() string {
	return Token(s.TotalItems) + " " + Token(s.Shipping) + " " + Token(s.Discount) + " " + Token(s.TotalPrice) + " " + Token(s.Notes)
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
