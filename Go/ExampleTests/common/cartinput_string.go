package common

type CartInputString struct {
	TotalItems DollarString
	Shipping DollarString
	Discount DollarString
	TotalPrice DollarString
	Notes string
}

func NewCartInputStringFromSlice(v []string) CartInputString {
	s := CartInputString{}
	if len(v) > 0 { s.TotalItems = DollarString(v[0]) }
	if len(v) > 1 { s.Shipping = DollarString(v[1]) }
	if len(v) > 2 { s.Discount = DollarString(v[2]) }
	if len(v) > 3 { s.TotalPrice = DollarString(v[3]) }
	if len(v) > 4 { s.Notes = v[4] }
	return s
}

// NewCartInputStringFromText builds from the text form, e.g. Money as "25 USD".
func NewCartInputStringFromText(text string) CartInputString {
	parts := RequireTokens(text, 5, "CartInput")
	return CartInputString{
		TotalItems: DollarString(parts[0]),
		Shipping: DollarString(parts[1]),
		Discount: DollarString(parts[2]),
		TotalPrice: DollarString(parts[3]),
		Notes: parts[4],
	}
}

func (s CartInputString) String() string {
	return Token(string(s.TotalItems)) + " " + Token(string(s.Shipping)) + " " + Token(string(s.Discount)) + " " + Token(string(s.TotalPrice)) + " " + Token(s.Notes)
}

func (s CartInputString) Equals(o CartInputString) bool {
	return DNCEqual(string(s.TotalItems), string(o.TotalItems)) &&
		DNCEqual(string(s.Shipping), string(o.Shipping)) &&
		DNCEqual(string(s.Discount), string(o.Discount)) &&
		DNCEqual(string(s.TotalPrice), string(o.TotalPrice)) &&
		DNCEqual(s.Notes, o.Notes)
}

func EqualCartInputStringSlices(a, b []CartInputString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
