package common

type AddressComponentsString struct {
	Zip string
	StreetName string
	City string
	PreDirection string
	SuffixDirection string
	State string
	SuffixType string
}

func NewAddressComponentsStringFromSlice(v []string) AddressComponentsString {
	s := AddressComponentsString{}
	if len(v) > 0 { s.Zip = v[0] }
	if len(v) > 1 { s.StreetName = v[1] }
	if len(v) > 2 { s.City = v[2] }
	if len(v) > 3 { s.PreDirection = v[3] }
	if len(v) > 4 { s.SuffixDirection = v[4] }
	if len(v) > 5 { s.State = v[5] }
	if len(v) > 6 { s.SuffixType = v[6] }
	return s
}

// NewAddressComponentsStringFromText builds from the text form, e.g. Money as "25 USD".
func NewAddressComponentsStringFromText(text string) AddressComponentsString {
	parts := RequireTokens(text, 7, "AddressComponents")
	return AddressComponentsString{
		Zip: parts[0],
		StreetName: parts[1],
		City: parts[2],
		PreDirection: parts[3],
		SuffixDirection: parts[4],
		State: parts[5],
		SuffixType: parts[6],
	}
}

func (s AddressComponentsString) String() string {
	return Token(s.Zip) + " " + Token(s.StreetName) + " " + Token(s.City) + " " + Token(s.PreDirection) + " " + Token(s.SuffixDirection) + " " + Token(s.State) + " " + Token(s.SuffixType)
}

func (s AddressComponentsString) Equals(o AddressComponentsString) bool {
	return DNCEqual(s.Zip, o.Zip) &&
		DNCEqual(s.StreetName, o.StreetName) &&
		DNCEqual(s.City, o.City) &&
		DNCEqual(s.PreDirection, o.PreDirection) &&
		DNCEqual(s.SuffixDirection, o.SuffixDirection) &&
		DNCEqual(s.State, o.State) &&
		DNCEqual(s.SuffixType, o.SuffixType)
}

func EqualAddressComponentsStringSlices(a, b []AddressComponentsString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
