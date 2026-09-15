package common

import "strconv"

type ResultValueTyped struct {
	Sum int
}

func NewResultValueTypedFromString(s ResultValueString) ResultValueTyped {
	t := ResultValueTyped{}
	if v, err := strconv.Atoi(s.Sum); err == nil { t.Sum = v }
	return t
}

// ToResultValueString converts this ResultValueTyped back to the string form a table compares.
func (t ResultValueTyped) ToResultValueString() ResultValueString {
	s := ResultValueString{}
	s.Sum = strconv.Itoa(t.Sum)
	return s
}

// ResultValueTypedToStringList converts a slice of ResultValueTyped to its string form.
func ResultValueTypedToStringList(list []ResultValueTyped) []ResultValueString {
	result := make([]ResultValueString, 0, len(list))
	for _, t := range list { result = append(result, t.ToResultValueString()) }
	return result
}

// ResultValueTypedFromStringList converts a slice of ResultValueString to its typed form.
func ResultValueTypedFromStringList(list []ResultValueString) []ResultValueTyped {
	result := make([]ResultValueTyped, 0, len(list))
	for _, s := range list { result = append(result, NewResultValueTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ResultValueTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Sum": t.Sum,
	}
}

func (t ResultValueTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewResultValueTypedFromJSONValue(m map[string]interface{}) (ResultValueTyped, error) {
	t := ResultValueTyped{}
	rawSum, err := JSONRequire(m, "Sum")
	if err != nil {
		return t, err
	}
	valSum, err := JSONAsInt(rawSum, "Sum")
	if err != nil {
		return t, err
	}
	t.Sum = valSum
	return t, nil
}

func NewResultValueTypedFromJSON(text string) (ResultValueTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ResultValueTyped{}, err
	}
	return NewResultValueTypedFromJSONValue(m)
}

func ResultValueTypedToJSONList(list []ResultValueTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ResultValueTypedFromJSONList(text string) ([]ResultValueTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ResultValueTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ResultValueTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewResultValueTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
