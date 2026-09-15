package common

import "strconv"

type StatusTyped struct {
	Code int
}

func NewStatusTypedFromString(s StatusString) StatusTyped {
	t := StatusTyped{}
	if v, err := strconv.Atoi(s.Code); err == nil { t.Code = v }
	return t
}

// ToStatusString converts this StatusTyped back to the string form a table compares.
func (t StatusTyped) ToStatusString() StatusString {
	s := StatusString{}
	s.Code = strconv.Itoa(t.Code)
	return s
}

// StatusTypedToStringList converts a slice of StatusTyped to its string form.
func StatusTypedToStringList(list []StatusTyped) []StatusString {
	result := make([]StatusString, 0, len(list))
	for _, t := range list { result = append(result, t.ToStatusString()) }
	return result
}

// StatusTypedFromStringList converts a slice of StatusString to its typed form.
func StatusTypedFromStringList(list []StatusString) []StatusTyped {
	result := make([]StatusTyped, 0, len(list))
	for _, s := range list { result = append(result, NewStatusTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t StatusTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Code": t.Code,
	}
}

func (t StatusTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewStatusTypedFromJSONValue(m map[string]interface{}) (StatusTyped, error) {
	t := StatusTyped{}
	rawCode, err := JSONRequire(m, "Code")
	if err != nil {
		return t, err
	}
	valCode, err := JSONAsInt(rawCode, "Code")
	if err != nil {
		return t, err
	}
	t.Code = valCode
	return t, nil
}

func NewStatusTypedFromJSON(text string) (StatusTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return StatusTyped{}, err
	}
	return NewStatusTypedFromJSONValue(m)
}

func StatusTypedToJSONList(list []StatusTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func StatusTypedFromJSONList(text string) ([]StatusTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]StatusTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "StatusTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewStatusTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
