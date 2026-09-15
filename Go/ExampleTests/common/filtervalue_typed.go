package common

type FilterValueTyped struct {
	Value string
}

func NewFilterValueTypedFromString(s FilterValueString) FilterValueTyped {
	t := FilterValueTyped{}
	t.Value = s.Value
	return t
}

// ToFilterValueString converts this FilterValueTyped back to the string form a table compares.
func (t FilterValueTyped) ToFilterValueString() FilterValueString {
	s := FilterValueString{}
	s.Value = t.Value
	return s
}

// FilterValueTypedToStringList converts a slice of FilterValueTyped to its string form.
func FilterValueTypedToStringList(list []FilterValueTyped) []FilterValueString {
	result := make([]FilterValueString, 0, len(list))
	for _, t := range list { result = append(result, t.ToFilterValueString()) }
	return result
}

// FilterValueTypedFromStringList converts a slice of FilterValueString to its typed form.
func FilterValueTypedFromStringList(list []FilterValueString) []FilterValueTyped {
	result := make([]FilterValueTyped, 0, len(list))
	for _, s := range list { result = append(result, NewFilterValueTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t FilterValueTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Value": t.Value,
	}
}

func (t FilterValueTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewFilterValueTypedFromJSONValue(m map[string]interface{}) (FilterValueTyped, error) {
	t := FilterValueTyped{}
	rawValue, err := JSONRequire(m, "Value")
	if err != nil {
		return t, err
	}
	valValue, err := JSONAsString(rawValue, "Value")
	if err != nil {
		return t, err
	}
	t.Value = valValue
	return t, nil
}

func NewFilterValueTypedFromJSON(text string) (FilterValueTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return FilterValueTyped{}, err
	}
	return NewFilterValueTypedFromJSONValue(m)
}

func FilterValueTypedToJSONList(list []FilterValueTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func FilterValueTypedFromJSONList(text string) ([]FilterValueTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]FilterValueTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "FilterValueTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewFilterValueTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
