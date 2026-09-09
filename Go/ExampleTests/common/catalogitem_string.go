package common

type CatalogItemString struct {
	Name string
	Price string
}

func NewCatalogItemStringFromSlice(v []string) CatalogItemString {
	s := CatalogItemString{}
	if len(v) > 0 { s.Name = v[0] }
	if len(v) > 1 { s.Price = v[1] }
	return s
}

// NewCatalogItemStringFromText builds from the text form, e.g. Money as "25 USD".
func NewCatalogItemStringFromText(text string) CatalogItemString {
	parts := RequireTokens(text, 2, "CatalogItem")
	return CatalogItemString{
		Name: parts[0],
		Price: parts[1],
	}
}

func (s CatalogItemString) String() string {
	return Token(s.Name) + " " + Token(s.Price)
}

func (s CatalogItemString) Equals(o CatalogItemString) bool {
	return DNCEqual(s.Name, o.Name) &&
		DNCEqual(s.Price, o.Price)
}

func EqualCatalogItemStringSlices(a, b []CatalogItemString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
