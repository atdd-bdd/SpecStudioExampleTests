package common

type PostString struct {
	UserId string
	Id string
	Title string
	Body string
}

func NewPostStringFromSlice(v []string) PostString {
	s := PostString{}
	if len(v) > 0 { s.UserId = v[0] }
	if len(v) > 1 { s.Id = v[1] }
	if len(v) > 2 { s.Title = v[2] }
	if len(v) > 3 { s.Body = v[3] }
	return s
}

// NewPostStringFromText builds from the text form, e.g. Money as "25 USD".
func NewPostStringFromText(text string) PostString {
	parts := RequireTokens(text, 4, "Post")
	return PostString{
		UserId: parts[0],
		Id: parts[1],
		Title: parts[2],
		Body: parts[3],
	}
}

func (s PostString) String() string {
	return Token(s.UserId) + " " + Token(s.Id) + " " + Token(s.Title) + " " + Token(s.Body)
}

func (s PostString) Equals(o PostString) bool {
	return DNCEqual(s.UserId, o.UserId) &&
		DNCEqual(s.Id, o.Id) &&
		DNCEqual(s.Title, o.Title) &&
		DNCEqual(s.Body, o.Body)
}

func EqualPostStringSlices(a, b []PostString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
