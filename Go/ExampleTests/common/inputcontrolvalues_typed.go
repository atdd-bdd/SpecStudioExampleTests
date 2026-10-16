package common

import "strconv"

type InputControlValuesTyped struct {
	Frame int
	Roll PinsTyped
	Remaining PinsTyped
}

func NewInputControlValuesTypedFromString(s InputControlValuesString) InputControlValuesTyped {
	t := InputControlValuesTyped{}
	if v, err := strconv.Atoi(s.Frame); err == nil { t.Frame = v }
	t.Roll = NewPinsTypedFromString(s.Roll)
	t.Remaining = NewPinsTypedFromString(s.Remaining)
	return t
}

// ToInputControlValuesString converts this InputControlValuesTyped back to the string form a table compares.
func (t InputControlValuesTyped) ToInputControlValuesString() InputControlValuesString {
	s := InputControlValuesString{}
	s.Frame = strconv.Itoa(t.Frame)
	s.Roll = t.Roll.ToPinsString()
	s.Remaining = t.Remaining.ToPinsString()
	return s
}

// InputControlValuesTypedToStringList converts a slice of InputControlValuesTyped to its string form.
func InputControlValuesTypedToStringList(list []InputControlValuesTyped) []InputControlValuesString {
	result := make([]InputControlValuesString, 0, len(list))
	for _, t := range list { result = append(result, t.ToInputControlValuesString()) }
	return result
}

// InputControlValuesTypedFromStringList converts a slice of InputControlValuesString to its typed form.
func InputControlValuesTypedFromStringList(list []InputControlValuesString) []InputControlValuesTyped {
	result := make([]InputControlValuesTyped, 0, len(list))
	for _, s := range list { result = append(result, NewInputControlValuesTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t InputControlValuesTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Frame": t.Frame,
		"Roll": t.Roll.String(),
		"Remaining": t.Remaining.String(),
	}
}

func (t InputControlValuesTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewInputControlValuesTypedFromJSONValue(m map[string]interface{}) (InputControlValuesTyped, error) {
	t := InputControlValuesTyped{}
	rawFrame, err := JSONRequire(m, "Frame")
	if err != nil {
		return t, err
	}
	valFrame, err := JSONAsInt(rawFrame, "Frame")
	if err != nil {
		return t, err
	}
	t.Frame = valFrame
	rawRoll, err := JSONRequire(m, "Roll")
	if err != nil {
		return t, err
	}
	valRoll, err := JSONAsString(rawRoll, "Roll")
	if err != nil {
		return t, err
	}
	t.Roll = NewPinsTyped(valRoll)
	rawRemaining, err := JSONRequire(m, "Remaining")
	if err != nil {
		return t, err
	}
	valRemaining, err := JSONAsString(rawRemaining, "Remaining")
	if err != nil {
		return t, err
	}
	t.Remaining = NewPinsTyped(valRemaining)
	return t, nil
}

func NewInputControlValuesTypedFromJSON(text string) (InputControlValuesTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return InputControlValuesTyped{}, err
	}
	return NewInputControlValuesTypedFromJSONValue(m)
}

func InputControlValuesTypedToJSONList(list []InputControlValuesTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func InputControlValuesTypedFromJSONList(text string) ([]InputControlValuesTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]InputControlValuesTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "InputControlValuesTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewInputControlValuesTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
