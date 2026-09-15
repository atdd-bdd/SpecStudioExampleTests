package common

type MatchString struct {
	MatchedAddress string
	AddressComponents AddressComponentsString
}

func NewMatchStringFromSlice(v []string) MatchString {
	s := MatchString{}
	if len(v) > 0 { s.MatchedAddress = v[0] }
	if len(v) > 1 { s.AddressComponents = NewAddressComponentsStringFromText(v[1]) }
	return s
}

// NewMatchStringFromText builds from the text form, e.g. Money as "25 USD".
func NewMatchStringFromText(text string) MatchString {
	parts := RequireTokens(text, 2, "Match")
	return MatchString{
		MatchedAddress: parts[0],
		AddressComponents: NewAddressComponentsStringFromText(parts[1]),
	}
}

func (s MatchString) String() string {
	return Token(s.MatchedAddress) + " " + Nested(s.AddressComponents.String())
}

func (s MatchString) Equals(o MatchString) bool {
	return DNCEqual(s.MatchedAddress, o.MatchedAddress) &&
		s.AddressComponents.Equals(o.AddressComponents)
}

func EqualMatchStringSlices(a, b []MatchString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
