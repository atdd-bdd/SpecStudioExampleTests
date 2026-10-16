package common

type FrameValuesString struct {
	Frame string
	Roll1 PinsString
	Roll2 PinsString
	Roll3 PinsString
	Score ScoreString
	TotalScore ScoreString
}

func NewFrameValuesStringFromSlice(v []string) FrameValuesString {
	s := FrameValuesString{}
	if len(v) > 0 { s.Frame = v[0] }
	if len(v) > 1 { s.Roll1 = PinsString(v[1]) }
	if len(v) > 2 { s.Roll2 = PinsString(v[2]) }
	if len(v) > 3 { s.Roll3 = PinsString(v[3]) }
	if len(v) > 4 { s.Score = ScoreString(v[4]) }
	if len(v) > 5 { s.TotalScore = ScoreString(v[5]) }
	return s
}

// NewFrameValuesStringFromText builds from the text form, e.g. Money as "25 USD".
func NewFrameValuesStringFromText(text string) FrameValuesString {
	parts := RequireTokens(text, 6, "FrameValues")
	return FrameValuesString{
		Frame: parts[0],
		Roll1: PinsString(parts[1]),
		Roll2: PinsString(parts[2]),
		Roll3: PinsString(parts[3]),
		Score: ScoreString(parts[4]),
		TotalScore: ScoreString(parts[5]),
	}
}

func (s FrameValuesString) String() string {
	return Token(s.Frame) + " " + Token(string(s.Roll1)) + " " + Token(string(s.Roll2)) + " " + Token(string(s.Roll3)) + " " + Token(string(s.Score)) + " " + Token(string(s.TotalScore))
}

func (s FrameValuesString) Equals(o FrameValuesString) bool {
	return DNCEqual(s.Frame, o.Frame) &&
		DNCEqual(string(s.Roll1), string(o.Roll1)) &&
		DNCEqual(string(s.Roll2), string(o.Roll2)) &&
		DNCEqual(string(s.Roll3), string(o.Roll3)) &&
		DNCEqual(string(s.Score), string(o.Score)) &&
		DNCEqual(string(s.TotalScore), string(o.TotalScore))
}

func EqualFrameValuesStringSlices(a, b []FrameValuesString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
