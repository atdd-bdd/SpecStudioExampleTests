package common

type FrameDisplayString struct {
	Frame string
	Mark1 string
	Mark2 string
	Mark3 string
	TotalScore string
}

func NewFrameDisplayStringFromSlice(v []string) FrameDisplayString {
	s := FrameDisplayString{}
	if len(v) > 0 { s.Frame = v[0] }
	if len(v) > 1 { s.Mark1 = v[1] }
	if len(v) > 2 { s.Mark2 = v[2] }
	if len(v) > 3 { s.Mark3 = v[3] }
	if len(v) > 4 { s.TotalScore = v[4] }
	return s
}

// NewFrameDisplayStringFromText builds from the text form, e.g. Money as "25 USD".
func NewFrameDisplayStringFromText(text string) FrameDisplayString {
	parts := RequireTokens(text, 5, "FrameDisplay")
	return FrameDisplayString{
		Frame: parts[0],
		Mark1: parts[1],
		Mark2: parts[2],
		Mark3: parts[3],
		TotalScore: parts[4],
	}
}

func (s FrameDisplayString) String() string {
	return Token(s.Frame) + " " + Token(s.Mark1) + " " + Token(s.Mark2) + " " + Token(s.Mark3) + " " + Token(s.TotalScore)
}

func (s FrameDisplayString) Equals(o FrameDisplayString) bool {
	return DNCEqual(s.Frame, o.Frame) &&
		DNCEqual(s.Mark1, o.Mark1) &&
		DNCEqual(s.Mark2, o.Mark2) &&
		DNCEqual(s.Mark3, o.Mark3) &&
		DNCEqual(s.TotalScore, o.TotalScore)
}

func EqualFrameDisplayStringSlices(a, b []FrameDisplayString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
