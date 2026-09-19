package common

import "strconv"

type FrameValuesTyped struct {
	Frame int
	Roll1 string
	Roll2 string
	Roll3 string
	Score string
	TotalScore string
}

func NewFrameValuesTypedFromString(s FrameValuesString) FrameValuesTyped {
	t := FrameValuesTyped{}
	if v, err := strconv.Atoi(s.Frame); err == nil { t.Frame = v }
	t.Roll1 = s.Roll1
	t.Roll2 = s.Roll2
	t.Roll3 = s.Roll3
	t.Score = s.Score
	t.TotalScore = s.TotalScore
	return t
}

// ToFrameValuesString converts this FrameValuesTyped back to the string form a table compares.
func (t FrameValuesTyped) ToFrameValuesString() FrameValuesString {
	s := FrameValuesString{}
	s.Frame = strconv.Itoa(t.Frame)
	s.Roll1 = t.Roll1
	s.Roll2 = t.Roll2
	s.Roll3 = t.Roll3
	s.Score = t.Score
	s.TotalScore = t.TotalScore
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
		"Roll1": t.Roll1,
		"Roll2": t.Roll2,
		"Roll3": t.Roll3,
		"Score": t.Score,
		"TotalScore": t.TotalScore,
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
	t.Roll1 = valRoll1
	rawRoll2, err := JSONRequire(m, "Roll2")
	if err != nil {
		return t, err
	}
	valRoll2, err := JSONAsString(rawRoll2, "Roll2")
	if err != nil {
		return t, err
	}
	t.Roll2 = valRoll2
	rawRoll3, err := JSONRequire(m, "Roll3")
	if err != nil {
		return t, err
	}
	valRoll3, err := JSONAsString(rawRoll3, "Roll3")
	if err != nil {
		return t, err
	}
	t.Roll3 = valRoll3
	rawScore, err := JSONRequire(m, "Score")
	if err != nil {
		return t, err
	}
	valScore, err := JSONAsString(rawScore, "Score")
	if err != nil {
		return t, err
	}
	t.Score = valScore
	rawTotalScore, err := JSONRequire(m, "TotalScore")
	if err != nil {
		return t, err
	}
	valTotalScore, err := JSONAsString(rawTotalScore, "TotalScore")
	if err != nil {
		return t, err
	}
	t.TotalScore = valTotalScore
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
