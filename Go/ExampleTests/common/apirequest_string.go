package common

type ApiRequestString struct {
	Method string
	Page string
	Parameter string
	Body string
}

func NewApiRequestStringFromSlice(v []string) ApiRequestString {
	s := ApiRequestString{}
	if len(v) > 0 { s.Method = v[0] }
	if len(v) > 1 { s.Page = v[1] }
	if len(v) > 2 { s.Parameter = v[2] }
	if len(v) > 3 { s.Body = v[3] }
	return s
}

// NewApiRequestStringFromText builds from the text form, e.g. Money as "25 USD".
func NewApiRequestStringFromText(text string) ApiRequestString {
	parts := RequireTokens(text, 4, "ApiRequest")
	return ApiRequestString{
		Method: parts[0],
		Page: parts[1],
		Parameter: parts[2],
		Body: parts[3],
	}
}

func (s ApiRequestString) String() string {
	return Token(s.Method) + " " + Token(s.Page) + " " + Token(s.Parameter) + " " + Token(s.Body)
}

func (s ApiRequestString) Equals(o ApiRequestString) bool {
	return DNCEqual(s.Method, o.Method) &&
		DNCEqual(s.Page, o.Page) &&
		DNCEqual(s.Parameter, o.Parameter) &&
		DNCEqual(s.Body, o.Body)
}

func EqualApiRequestStringSlices(a, b []ApiRequestString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
