package common

type ShippingInputString struct {
	TotalPrice DollarString
	ShippingCost DollarString
	Notes string
}

func NewShippingInputStringFromSlice(v []string) ShippingInputString {
	s := ShippingInputString{}
	if len(v) > 0 { s.TotalPrice = DollarString(v[0]) }
	if len(v) > 1 { s.ShippingCost = DollarString(v[1]) }
	if len(v) > 2 { s.Notes = v[2] }
	return s
}

// NewShippingInputStringFromText builds from the text form, e.g. Money as "25 USD".
func NewShippingInputStringFromText(text string) ShippingInputString {
	parts := RequireTokens(text, 3, "ShippingInput")
	return ShippingInputString{
		TotalPrice: DollarString(parts[0]),
		ShippingCost: DollarString(parts[1]),
		Notes: parts[2],
	}
}

func (s ShippingInputString) String() string {
	return Token(string(s.TotalPrice)) + " " + Token(string(s.ShippingCost)) + " " + Token(s.Notes)
}

func (s ShippingInputString) Equals(o ShippingInputString) bool {
	return DNCEqual(string(s.TotalPrice), string(o.TotalPrice)) &&
		DNCEqual(string(s.ShippingCost), string(o.ShippingCost)) &&
		DNCEqual(s.Notes, o.Notes)
}

func EqualShippingInputStringSlices(a, b []ShippingInputString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
