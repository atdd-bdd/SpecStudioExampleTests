package common

type ReplacePostString struct {
	Id string
	UserId string
	Title string
	Body string
}

func NewReplacePostStringFromSlice(v []string) ReplacePostString {
	s := ReplacePostString{}
	if len(v) > 0 { s.Id = v[0] }
	if len(v) > 1 { s.UserId = v[1] }
	if len(v) > 2 { s.Title = v[2] }
	if len(v) > 3 { s.Body = v[3] }
	return s
}

// NewReplacePostStringFromText builds from the text form, e.g. Money as "25 USD".
func NewReplacePostStringFromText(text string) ReplacePostString {
	parts := RequireTokens(text, 4, "ReplacePost")
	return ReplacePostString{
		Id: parts[0],
		UserId: parts[1],
		Title: parts[2],
		Body: parts[3],
	}
}

func (s ReplacePostString) String() string {
	return Token(s.Id) + " " + Token(s.UserId) + " " + Token(s.Title) + " " + Token(s.Body)
}

func (s ReplacePostString) Equals(o ReplacePostString) bool {
	return DNCEqual(s.Id, o.Id) &&
		DNCEqual(s.UserId, o.UserId) &&
		DNCEqual(s.Title, o.Title) &&
		DNCEqual(s.Body, o.Body)
}

func EqualReplacePostStringSlices(a, b []ReplacePostString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
