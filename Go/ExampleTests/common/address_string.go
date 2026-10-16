package common

type AddressString struct {
	Street SimpleTextString
	City SimpleTextString
	State SimpleTextString
	ZIP SimpleTextString
}

func NewAddressStringFromSlice(v []string) AddressString {
	s := AddressString{}
	if len(v) > 0 { s.Street = SimpleTextString(v[0]) }
	if len(v) > 1 { s.City = SimpleTextString(v[1]) }
	if len(v) > 2 { s.State = SimpleTextString(v[2]) }
	if len(v) > 3 { s.ZIP = SimpleTextString(v[3]) }
	return s
}

// NewAddressStringFromText builds from the text form, e.g. Money as "25 USD".
func NewAddressStringFromText(text string) AddressString {
	parts := RequireTokens(text, 4, "Address")
	return AddressString{
		Street: SimpleTextString(parts[0]),
		City: SimpleTextString(parts[1]),
		State: SimpleTextString(parts[2]),
		ZIP: SimpleTextString(parts[3]),
	}
}

func (s AddressString) String() string {
	return Token(string(s.Street)) + " " + Token(string(s.City)) + " " + Token(string(s.State)) + " " + Token(string(s.ZIP))
}

func (s AddressString) Equals(o AddressString) bool {
	return DNCEqual(string(s.Street), string(o.Street)) &&
		DNCEqual(string(s.City), string(o.City)) &&
		DNCEqual(string(s.State), string(o.State)) &&
		DNCEqual(string(s.ZIP), string(o.ZIP))
}

func EqualAddressStringSlices(a, b []AddressString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
