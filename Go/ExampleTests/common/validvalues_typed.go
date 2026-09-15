package common

import "strconv"

type ValidValuesTyped struct {
	Value string
	IsValid bool
	Notes string
}

func NewValidValuesTypedFromString(s ValidValuesString) ValidValuesTyped {
	t := ValidValuesTyped{}
	t.Value = s.Value
	t.IsValid = ParseBoolCell(s.IsValid)
	t.Notes = s.Notes
	return t
}

// ToValidValuesString converts this ValidValuesTyped back to the string form a table compares.
func (t ValidValuesTyped) ToValidValuesString() ValidValuesString {
	s := ValidValuesString{}
	s.Value = t.Value
	s.IsValid = strconv.FormatBool(t.IsValid)
	s.Notes = t.Notes
	return s
}

// ValidValuesTypedToStringList converts a slice of ValidValuesTyped to its string form.
func ValidValuesTypedToStringList(list []ValidValuesTyped) []ValidValuesString {
	result := make([]ValidValuesString, 0, len(list))
	for _, t := range list { result = append(result, t.ToValidValuesString()) }
	return result
}

// ValidValuesTypedFromStringList converts a slice of ValidValuesString to its typed form.
func ValidValuesTypedFromStringList(list []ValidValuesString) []ValidValuesTyped {
	result := make([]ValidValuesTyped, 0, len(list))
	for _, s := range list { result = append(result, NewValidValuesTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ValidValuesTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Value": t.Value,
		"IsValid": t.IsValid,
		"Notes": t.Notes,
	}
}

func (t ValidValuesTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewValidValuesTypedFromJSONValue(m map[string]interface{}) (ValidValuesTyped, error) {
	t := ValidValuesTyped{}
	rawValue, err := JSONRequire(m, "Value")
	if err != nil {
		return t, err
	}
	valValue, err := JSONAsString(rawValue, "Value")
	if err != nil {
		return t, err
	}
	t.Value = valValue
	rawIsValid, err := JSONRequire(m, "IsValid")
	if err != nil {
		return t, err
	}
	valIsValid, err := JSONAsBool(rawIsValid, "IsValid")
	if err != nil {
		return t, err
	}
	t.IsValid = valIsValid
	rawNotes, err := JSONRequire(m, "Notes")
	if err != nil {
		return t, err
	}
	valNotes, err := JSONAsString(rawNotes, "Notes")
	if err != nil {
		return t, err
	}
	t.Notes = valNotes
	return t, nil
}

func NewValidValuesTypedFromJSON(text string) (ValidValuesTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ValidValuesTyped{}, err
	}
	return NewValidValuesTypedFromJSONValue(m)
}

func ValidValuesTypedToJSONList(list []ValidValuesTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ValidValuesTypedFromJSONList(text string) ([]ValidValuesTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ValidValuesTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ValidValuesTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewValidValuesTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
