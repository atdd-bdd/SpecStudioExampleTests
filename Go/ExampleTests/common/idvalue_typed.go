package common

import "strconv"

type IDValueTyped struct {
	ID string
	Value int
}

func NewIDValueTypedFromString(s IDValueString) IDValueTyped {
	t := IDValueTyped{}
	t.ID = s.ID
	if v, err := strconv.Atoi(s.Value); err == nil { t.Value = v }
	return t
}

// ToIDValueString converts this IDValueTyped back to the string form a table compares.
func (t IDValueTyped) ToIDValueString() IDValueString {
	s := IDValueString{}
	s.ID = t.ID
	s.Value = strconv.Itoa(t.Value)
	return s
}

// IDValueTypedToStringList converts a slice of IDValueTyped to its string form.
func IDValueTypedToStringList(list []IDValueTyped) []IDValueString {
	result := make([]IDValueString, 0, len(list))
	for _, t := range list { result = append(result, t.ToIDValueString()) }
	return result
}

// IDValueTypedFromStringList converts a slice of IDValueString to its typed form.
func IDValueTypedFromStringList(list []IDValueString) []IDValueTyped {
	result := make([]IDValueTyped, 0, len(list))
	for _, s := range list { result = append(result, NewIDValueTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t IDValueTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"ID": t.ID,
		"Value": t.Value,
	}
}

func (t IDValueTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewIDValueTypedFromJSONValue(m map[string]interface{}) (IDValueTyped, error) {
	t := IDValueTyped{}
	rawID, err := JSONRequire(m, "ID")
	if err != nil {
		return t, err
	}
	valID, err := JSONAsString(rawID, "ID")
	if err != nil {
		return t, err
	}
	t.ID = valID
	rawValue, err := JSONRequire(m, "Value")
	if err != nil {
		return t, err
	}
	valValue, err := JSONAsInt(rawValue, "Value")
	if err != nil {
		return t, err
	}
	t.Value = valValue
	return t, nil
}

func NewIDValueTypedFromJSON(text string) (IDValueTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return IDValueTyped{}, err
	}
	return NewIDValueTypedFromJSONValue(m)
}

func IDValueTypedToJSONList(list []IDValueTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func IDValueTypedFromJSONList(text string) ([]IDValueTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]IDValueTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "IDValueTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewIDValueTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
