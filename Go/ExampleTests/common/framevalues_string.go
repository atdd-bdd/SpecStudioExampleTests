package common

type FrameValuesString struct {
	Frame string
	Roll1 string
	Roll2 string
	Roll3 string
	Score string
	TotalScore string
}

func NewFrameValuesStringFromSlice(v []string) FrameValuesString {
	s := FrameValuesString{}
	if len(v) > 0 { s.Frame = v[0] }
	if len(v) > 1 { s.Roll1 = v[1] }
	if len(v) > 2 { s.Roll2 = v[2] }
	if len(v) > 3 { s.Roll3 = v[3] }
	if len(v) > 4 { s.Score = v[4] }
	if len(v) > 5 { s.TotalScore = v[5] }
	return s
}

// NewFrameValuesStringFromText builds from the text form, e.g. Money as "25 USD".
func NewFrameValuesStringFromText(text string) FrameValuesString {
	parts := RequireTokens(text, 6, "FrameValues")
	return FrameValuesString{
		Frame: parts[0],
		Roll1: parts[1],
		Roll2: parts[2],
		Roll3: parts[3],
		Score: parts[4],
		TotalScore: parts[5],
	}
}

func (s FrameValuesString) String() string {
	return Token(s.Frame) + " " + Token(s.Roll1) + " " + Token(s.Roll2) + " " + Token(s.Roll3) + " " + Token(s.Score) + " " + Token(s.TotalScore)
}

func (s FrameValuesString) Equals(o FrameValuesString) bool {
	return DNCEqual(s.Frame, o.Frame) &&
		DNCEqual(s.Roll1, o.Roll1) &&
		DNCEqual(s.Roll2, o.Roll2) &&
		DNCEqual(s.Roll3, o.Roll3) &&
		DNCEqual(s.Score, o.Score) &&
		DNCEqual(s.TotalScore, o.TotalScore)
}

func EqualFrameValuesStringSlices(a, b []FrameValuesString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
