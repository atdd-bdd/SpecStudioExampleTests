package common

type RequestString struct {
	Method string
	Page string
	Address string
	Benchmark string
	Format string
}

func NewRequestStringFromSlice(v []string) RequestString {
	s := RequestString{}
	if len(v) > 0 { s.Method = v[0] }
	if len(v) > 1 { s.Page = v[1] }
	if len(v) > 2 { s.Address = v[2] }
	if len(v) > 3 { s.Benchmark = v[3] }
	if len(v) > 4 { s.Format = v[4] }
	return s
}

// NewRequestStringFromText builds from the text form, e.g. Money as "25 USD".
func NewRequestStringFromText(text string) RequestString {
	parts := RequireTokens(text, 5, "Request")
	return RequestString{
		Method: parts[0],
		Page: parts[1],
		Address: parts[2],
		Benchmark: parts[3],
		Format: parts[4],
	}
}

func (s RequestString) String() string {
	return Token(s.Method) + " " + Token(s.Page) + " " + Token(s.Address) + " " + Token(s.Benchmark) + " " + Token(s.Format)
}

func (s RequestString) Equals(o RequestString) bool {
	return DNCEqual(s.Method, o.Method) &&
		DNCEqual(s.Page, o.Page) &&
		DNCEqual(s.Address, o.Address) &&
		DNCEqual(s.Benchmark, o.Benchmark) &&
		DNCEqual(s.Format, o.Format)
}

func EqualRequestStringSlices(a, b []RequestString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
