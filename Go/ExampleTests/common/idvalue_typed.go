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

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t IDValueTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"id": t.ID,
		"value": t.Value,
	}
}

func (t IDValueTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewIDValueTypedFromJSONValue(m map[string]interface{}) (IDValueTyped, error) {
	t := IDValueTyped{}
	rawID, err := JSONRequire(m, "id")
	if err != nil {
		return t, err
	}
	valID, err := JSONAsString(rawID, "id")
	if err != nil {
		return t, err
	}
	t.ID = valID
	rawValue, err := JSONRequire(m, "value")
	if err != nil {
		return t, err
	}
	valValue, err := JSONAsInt(rawValue, "value")
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
