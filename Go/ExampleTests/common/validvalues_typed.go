package common

type ValidValuesTyped struct {
	Value string
	IsValid bool
	Notes string
}

func NewValidValuesTypedFromString(s ValidValuesString) ValidValuesTyped {
	t := ValidValuesTyped{}
	t.Value = s.Value
	t.IsValid = s.IsValid == "true" || s.IsValid == "t" || s.IsValid == "yes" || s.IsValid == "y" || s.IsValid == "1"
	t.Notes = s.Notes
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ValidValuesTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"value": t.Value,
		"isvalid": t.IsValid,
		"notes": t.Notes,
	}
}

func (t ValidValuesTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewValidValuesTypedFromJSONValue(m map[string]interface{}) (ValidValuesTyped, error) {
	t := ValidValuesTyped{}
	rawValue, err := JSONRequire(m, "value")
	if err != nil {
		return t, err
	}
	valValue, err := JSONAsString(rawValue, "value")
	if err != nil {
		return t, err
	}
	t.Value = valValue
	rawIsValid, err := JSONRequire(m, "isvalid")
	if err != nil {
		return t, err
	}
	valIsValid, err := JSONAsBool(rawIsValid, "isvalid")
	if err != nil {
		return t, err
	}
	t.IsValid = valIsValid
	rawNotes, err := JSONRequire(m, "notes")
	if err != nil {
		return t, err
	}
	valNotes, err := JSONAsString(rawNotes, "notes")
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
