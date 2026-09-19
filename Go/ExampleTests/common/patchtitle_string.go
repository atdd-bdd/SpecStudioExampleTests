package common

type PatchTitleString struct {
	Title string
}

func NewPatchTitleStringFromSlice(v []string) PatchTitleString {
	s := PatchTitleString{}
	if len(v) > 0 { s.Title = v[0] }
	return s
}

// NewPatchTitleStringFromText builds from the text form, e.g. Money as "25 USD".
func NewPatchTitleStringFromText(text string) PatchTitleString {
	parts := RequireTokens(text, 1, "PatchTitle")
	return PatchTitleString{
		Title: parts[0],
	}
}

func (s PatchTitleString) String() string {
	return Token(s.Title)
}

func (s PatchTitleString) Equals(o PatchTitleString) bool {
	return DNCEqual(s.Title, o.Title)
}

func EqualPatchTitleStringSlices(a, b []PatchTitleString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
