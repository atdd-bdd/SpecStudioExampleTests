package common

type ItemPriceInputString struct {
	TotalItems DollarString
}

func NewItemPriceInputStringFromSlice(v []string) ItemPriceInputString {
	s := ItemPriceInputString{}
	if len(v) > 0 { s.TotalItems = DollarString(v[0]) }
	return s
}

// NewItemPriceInputStringFromText builds from the text form, e.g. Money as "25 USD".
func NewItemPriceInputStringFromText(text string) ItemPriceInputString {
	parts := RequireTokens(text, 1, "ItemPriceInput")
	return ItemPriceInputString{
		TotalItems: DollarString(parts[0]),
	}
}

func (s ItemPriceInputString) String() string {
	return Token(string(s.TotalItems))
}

func (s ItemPriceInputString) Equals(o ItemPriceInputString) bool {
	return DNCEqual(string(s.TotalItems), string(o.TotalItems))
}

func EqualItemPriceInputStringSlices(a, b []ItemPriceInputString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
