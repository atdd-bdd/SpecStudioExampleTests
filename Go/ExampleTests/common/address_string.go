package common

type AddressString struct {
	Street string
	City string
	State string
	ZIP string
}

func NewAddressStringFromSlice(v []string) AddressString {
	s := AddressString{}
	if len(v) > 0 { s.Street = v[0] }
	if len(v) > 1 { s.City = v[1] }
	if len(v) > 2 { s.State = v[2] }
	if len(v) > 3 { s.ZIP = v[3] }
	return s
}

// NewAddressStringFromText builds from the text form, e.g. Money as "25 USD".
func NewAddressStringFromText(text string) AddressString {
	parts := RequireTokens(text, 4, "Address")
	return AddressString{
		Street: parts[0],
		City: parts[1],
		State: parts[2],
		ZIP: parts[3],
	}
}

func (s AddressString) String() string {
	return Token(s.Street) + " " + Token(s.City) + " " + Token(s.State) + " " + Token(s.ZIP)
}

func (s AddressString) Equals(o AddressString) bool {
	return DNCEqual(s.Street, o.Street) &&
		DNCEqual(s.City, o.City) &&
		DNCEqual(s.State, o.State) &&
		DNCEqual(s.ZIP, o.ZIP)
}

func EqualAddressStringSlices(a, b []AddressString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
