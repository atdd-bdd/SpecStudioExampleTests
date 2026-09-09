package common

type DiscountInputString struct {
	TotalPrice string
	Discount string
	Notes string
}

func NewDiscountInputStringFromSlice(v []string) DiscountInputString {
	s := DiscountInputString{}
	if len(v) > 0 { s.TotalPrice = v[0] }
	if len(v) > 1 { s.Discount = v[1] }
	if len(v) > 2 { s.Notes = v[2] }
	return s
}

// NewDiscountInputStringFromText builds from the text form, e.g. Money as "25 USD".
func NewDiscountInputStringFromText(text string) DiscountInputString {
	parts := RequireTokens(text, 3, "DiscountInput")
	return DiscountInputString{
		TotalPrice: parts[0],
		Discount: parts[1],
		Notes: parts[2],
	}
}

func (s DiscountInputString) String() string {
	return Token(s.TotalPrice) + " " + Token(s.Discount) + " " + Token(s.Notes)
}

func (s DiscountInputString) Equals(o DiscountInputString) bool {
	return DNCEqual(s.TotalPrice, o.TotalPrice) &&
		DNCEqual(s.Discount, o.Discount) &&
		DNCEqual(s.Notes, o.Notes)
}

func EqualDiscountInputStringSlices(a, b []DiscountInputString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
