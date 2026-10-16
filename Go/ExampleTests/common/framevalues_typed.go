package common

import "strconv"

type FrameValuesTyped struct {
	Frame int
	Roll1 PinsTyped
	Roll2 PinsTyped
	Roll3 PinsTyped
	Score ScoreTyped
	TotalScore ScoreTyped
}

func NewFrameValuesTypedFromString(s FrameValuesString) FrameValuesTyped {
	t := FrameValuesTyped{}
	if v, err := strconv.Atoi(s.Frame); err == nil { t.Frame = v }
	t.Roll1 = NewPinsTypedFromString(s.Roll1)
	t.Roll2 = NewPinsTypedFromString(s.Roll2)
	t.Roll3 = NewPinsTypedFromString(s.Roll3)
	t.Score = NewScoreTypedFromString(s.Score)
	t.TotalScore = NewScoreTypedFromString(s.TotalScore)
	return t
}

// ToFrameValuesString converts this FrameValuesTyped back to the string form a table compares.
func (t FrameValuesTyped) ToFrameValuesString() FrameValuesString {
	s := FrameValuesString{}
	s.Frame = strconv.Itoa(t.Frame)
	s.Roll1 = t.Roll1.ToPinsString()
	s.Roll2 = t.Roll2.ToPinsString()
	s.Roll3 = t.Roll3.ToPinsString()
	s.Score = t.Score.ToScoreString()
	s.TotalScore = t.TotalScore.ToScoreString()
	return s
}

// FrameValuesTypedToStringList converts a slice of FrameValuesTyped to its string form.
func FrameValuesTypedToStringList(list []FrameValuesTyped) []FrameValuesString {
	result := make([]FrameValuesString, 0, len(list))
	for _, t := range list { result = append(result, t.ToFrameValuesString()) }
	return result
}

// FrameValuesTypedFromStringList converts a slice of FrameValuesString to its typed form.
func FrameValuesTypedFromStringList(list []FrameValuesString) []FrameValuesTyped {
	result := make([]FrameValuesTyped, 0, len(list))
	for _, s := range list { result = append(result, NewFrameValuesTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t FrameValuesTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Frame": t.Frame,
		"Roll1": t.Roll1.String(),
		"Roll2": t.Roll2.String(),
		"Roll3": t.Roll3.String(),
		"Score": t.Score.String(),
		"TotalScore": t.TotalScore.String(),
	}
}

func (t FrameValuesTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewFrameValuesTypedFromJSONValue(m map[string]interface{}) (FrameValuesTyped, error) {
	t := FrameValuesTyped{}
	rawFrame, err := JSONRequire(m, "Frame")
	if err != nil {
		return t, err
	}
	valFrame, err := JSONAsInt(rawFrame, "Frame")
	if err != nil {
		return t, err
	}
	t.Frame = valFrame
	rawRoll1, err := JSONRequire(m, "Roll1")
	if err != nil {
		return t, err
	}
	valRoll1, err := JSONAsString(rawRoll1, "Roll1")
	if err != nil {
		return t, err
	}
	t.Roll1 = NewPinsTyped(valRoll1)
	rawRoll2, err := JSONRequire(m, "Roll2")
	if err != nil {
		return t, err
	}
	valRoll2, err := JSONAsString(rawRoll2, "Roll2")
	if err != nil {
		return t, err
	}
	t.Roll2 = NewPinsTyped(valRoll2)
	rawRoll3, err := JSONRequire(m, "Roll3")
	if err != nil {
		return t, err
	}
	valRoll3, err := JSONAsString(rawRoll3, "Roll3")
	if err != nil {
		return t, err
	}
	t.Roll3 = NewPinsTyped(valRoll3)
	rawScore, err := JSONRequire(m, "Score")
	if err != nil {
		return t, err
	}
	valScore, err := JSONAsString(rawScore, "Score")
	if err != nil {
		return t, err
	}
	t.Score = NewScoreTyped(valScore)
	rawTotalScore, err := JSONRequire(m, "TotalScore")
	if err != nil {
		return t, err
	}
	valTotalScore, err := JSONAsString(rawTotalScore, "TotalScore")
	if err != nil {
		return t, err
	}
	t.TotalScore = NewScoreTyped(valTotalScore)
	return t, nil
}

func NewFrameValuesTypedFromJSON(text string) (FrameValuesTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return FrameValuesTyped{}, err
	}
	return NewFrameValuesTypedFromJSONValue(m)
}

func FrameValuesTypedToJSONList(list []FrameValuesTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func FrameValuesTypedFromJSONList(text string) ([]FrameValuesTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]FrameValuesTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "FrameValuesTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewFrameValuesTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
