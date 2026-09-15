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

// ToSimpleClassString converts this SimpleClassTyped back to the string form a table compares.
func (t SimpleClassTyped) ToSimpleClassString() SimpleClassString {
	s := SimpleClassString{}
	s.AnInt = strconv.Itoa(t.AnInt)
	s.AString = t.AString
	return s
}

// SimpleClassTypedToStringList converts a slice of SimpleClassTyped to its string form.
func SimpleClassTypedToStringList(list []SimpleClassTyped) []SimpleClassString {
	result := make([]SimpleClassString, 0, len(list))
	for _, t := range list { result = append(result, t.ToSimpleClassString()) }
	return result
}

// SimpleClassTypedFromStringList converts a slice of SimpleClassString to its typed form.
func SimpleClassTypedFromStringList(list []SimpleClassString) []SimpleClassTyped {
	result := make([]SimpleClassTyped, 0, len(list))
	for _, s := range list { result = append(result, NewSimpleClassTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t SimpleClassTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"anInt": t.AnInt,
		"aString": t.AString,
	}
}

func (t SimpleClassTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewSimpleClassTypedFromJSONValue(m map[string]interface{}) (SimpleClassTyped, error) {
	t := SimpleClassTyped{}
	rawAnInt, err := JSONRequire(m, "anInt")
	if err != nil {
		return t, err
	}
	valAnInt, err := JSONAsInt(rawAnInt, "anInt")
	if err != nil {
		return t, err
	}
	t.AnInt = valAnInt
	rawAString, err := JSONRequire(m, "aString")
	if err != nil {
		return t, err
	}
	valAString, err := JSONAsString(rawAString, "aString")
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
