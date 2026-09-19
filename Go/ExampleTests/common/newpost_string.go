package common

type NewPostString struct {
	Title string
	Body string
	UserId string
}

func NewNewPostStringFromSlice(v []string) NewPostString {
	s := NewPostString{}
	if len(v) > 0 { s.Title = v[0] }
	if len(v) > 1 { s.Body = v[1] }
	if len(v) > 2 { s.UserId = v[2] }
	return s
}

// NewNewPostStringFromText builds from the text form, e.g. Money as "25 USD".
func NewNewPostStringFromText(text string) NewPostString {
	parts := RequireTokens(text, 3, "NewPost")
	return NewPostString{
		Title: parts[0],
		Body: parts[1],
		UserId: parts[2],
	}
}

func (s NewPostString) String() string {
	return Token(s.Title) + " " + Token(s.Body) + " " + Token(s.UserId)
}

func (s NewPostString) Equals(o NewPostString) bool {
	return DNCEqual(s.Title, o.Title) &&
		DNCEqual(s.Body, o.Body) &&
		DNCEqual(s.UserId, o.UserId)
}

func EqualNewPostStringSlices(a, b []NewPostString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
