package common

type FilterValueTyped struct {
	Value IDForm
}

func NewFilterValueTypedFromString(s FilterValueString) FilterValueTyped {
	t := FilterValueTyped{}
	t.Value = IDForm(s.Value)
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t FilterValueTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"value": string(t.Value),
	}
}

func (t FilterValueTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewFilterValueTypedFromJSONValue(m map[string]interface{}) (FilterValueTyped, error) {
	t := FilterValueTyped{}
	rawValue, err := JSONRequire(m, "value")
	if err != nil {
		return t, err
	}
	valValue, err := JSONAsString(rawValue, "value")
	if err != nil {
		return t, err
	}
	t.Value = IDForm(valValue)
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
