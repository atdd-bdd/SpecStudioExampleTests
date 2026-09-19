package common

type FrameDisplayTyped struct {
	Frame string
	Mark1 string
	Mark2 string
	Mark3 string
	TotalScore string
}

func NewFrameDisplayTypedFromString(s FrameDisplayString) FrameDisplayTyped {
	t := FrameDisplayTyped{}
	t.Frame = s.Frame
	t.Mark1 = s.Mark1
	t.Mark2 = s.Mark2
	t.Mark3 = s.Mark3
	t.TotalScore = s.TotalScore
	return t
}

// ToFrameDisplayString converts this FrameDisplayTyped back to the string form a table compares.
func (t FrameDisplayTyped) ToFrameDisplayString() FrameDisplayString {
	s := FrameDisplayString{}
	s.Frame = t.Frame
	s.Mark1 = t.Mark1
	s.Mark2 = t.Mark2
	s.Mark3 = t.Mark3
	s.TotalScore = t.TotalScore
	return s
}

// FrameDisplayTypedToStringList converts a slice of FrameDisplayTyped to its string form.
func FrameDisplayTypedToStringList(list []FrameDisplayTyped) []FrameDisplayString {
	result := make([]FrameDisplayString, 0, len(list))
	for _, t := range list { result = append(result, t.ToFrameDisplayString()) }
	return result
}

// FrameDisplayTypedFromStringList converts a slice of FrameDisplayString to its typed form.
func FrameDisplayTypedFromStringList(list []FrameDisplayString) []FrameDisplayTyped {
	result := make([]FrameDisplayTyped, 0, len(list))
	for _, s := range list { result = append(result, NewFrameDisplayTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t FrameDisplayTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Frame": t.Frame,
		"Mark1": t.Mark1,
		"Mark2": t.Mark2,
		"Mark3": t.Mark3,
		"TotalScore": t.TotalScore,
	}
}

func (t FrameDisplayTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewFrameDisplayTypedFromJSONValue(m map[string]interface{}) (FrameDisplayTyped, error) {
	t := FrameDisplayTyped{}
	rawFrame, err := JSONRequire(m, "Frame")
	if err != nil {
		return t, err
	}
	valFrame, err := JSONAsString(rawFrame, "Frame")
	if err != nil {
		return t, err
	}
	t.Frame = valFrame
	rawMark1, err := JSONRequire(m, "Mark1")
	if err != nil {
		return t, err
	}
	valMark1, err := JSONAsString(rawMark1, "Mark1")
	if err != nil {
		return t, err
	}
	t.Mark1 = valMark1
	rawMark2, err := JSONRequire(m, "Mark2")
	if err != nil {
		return t, err
	}
	valMark2, err := JSONAsString(rawMark2, "Mark2")
	if err != nil {
		return t, err
	}
	t.Mark2 = valMark2
	rawMark3, err := JSONRequire(m, "Mark3")
	if err != nil {
		return t, err
	}
	valMark3, err := JSONAsString(rawMark3, "Mark3")
	if err != nil {
		return t, err
	}
	t.Mark3 = valMark3
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

func NewFrameDisplayTypedFromJSON(text string) (FrameDisplayTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return FrameDisplayTyped{}, err
	}
	return NewFrameDisplayTypedFromJSONValue(m)
}

func FrameDisplayTypedToJSONList(list []FrameDisplayTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func FrameDisplayTypedFromJSONList(text string) ([]FrameDisplayTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]FrameDisplayTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "FrameDisplayTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewFrameDisplayTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
