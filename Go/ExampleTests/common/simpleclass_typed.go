package common

import "strconv"

type SimpleClassTyped struct {
	AnInt int
	AString string
}

func NewSimpleClassTypedFromString(s SimpleClassString) SimpleClassTyped {
	t := SimpleClassTyped{}
	if v, err := strconv.Atoi(s.AnInt); err == nil { t.AnInt = v }
	t.AString = s.AString
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t SimpleClassTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"anint": t.AnInt,
		"astring": t.AString,
	}
}

func (t SimpleClassTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewSimpleClassTypedFromJSONValue(m map[string]interface{}) (SimpleClassTyped, error) {
	t := SimpleClassTyped{}
	rawAnInt, err := JSONRequire(m, "anint")
	if err != nil {
		return t, err
	}
	valAnInt, err := JSONAsInt(rawAnInt, "anint")
	if err != nil {
		return t, err
	}
	t.AnInt = valAnInt
	rawAString, err := JSONRequire(m, "astring")
	if err != nil {
		return t, err
	}
	valAString, err := JSONAsString(rawAString, "astring")
	if err != nil {
		return t, err
	}
	t.AString = valAString
	return t, nil
}

func NewSimpleClassTypedFromJSON(text string) (SimpleClassTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return SimpleClassTyped{}, err
	}
	return NewSimpleClassTypedFromJSONValue(m)
}

func SimpleClassTypedToJSONList(list []SimpleClassTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func SimpleClassTypedFromJSONList(text string) ([]SimpleClassTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]SimpleClassTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "SimpleClassTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewSimpleClassTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
