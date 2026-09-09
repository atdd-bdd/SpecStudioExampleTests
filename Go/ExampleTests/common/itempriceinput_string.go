package common

type ItemPriceInputString struct {
	TotalItems string
}

func NewItemPriceInputStringFromSlice(v []string) ItemPriceInputString {
	s := ItemPriceInputString{}
	if len(v) > 0 { s.TotalItems = v[0] }
	return s
}

// NewItemPriceInputStringFromText builds from the text form, e.g. Money as "25 USD".
func NewItemPriceInputStringFromText(text string) ItemPriceInputString {
	parts := RequireTokens(text, 1, "ItemPriceInput")
	return ItemPriceInputString{
		TotalItems: parts[0],
	}
}

func (s ItemPriceInputString) String() string {
	return Token(s.TotalItems)
}

func (s ItemPriceInputString) Equals(o ItemPriceInputString) bool {
	return DNCEqual(s.TotalItems, o.TotalItems)
}

func EqualItemPriceInputStringSlices(a, b []ItemPriceInputString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
