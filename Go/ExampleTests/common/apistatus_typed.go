package common

import "strconv"

type ApiStatusTyped struct {
	Code int
}

func NewApiStatusTypedFromString(s ApiStatusString) ApiStatusTyped {
	t := ApiStatusTyped{}
	if v, err := strconv.Atoi(s.Code); err == nil { t.Code = v }
	return t
}

// ToApiStatusString converts this ApiStatusTyped back to the string form a table compares.
func (t ApiStatusTyped) ToApiStatusString() ApiStatusString {
	s := ApiStatusString{}
	s.Code = strconv.Itoa(t.Code)
	return s
}

// ApiStatusTypedToStringList converts a slice of ApiStatusTyped to its string form.
func ApiStatusTypedToStringList(list []ApiStatusTyped) []ApiStatusString {
	result := make([]ApiStatusString, 0, len(list))
	for _, t := range list { result = append(result, t.ToApiStatusString()) }
	return result
}

// ApiStatusTypedFromStringList converts a slice of ApiStatusString to its typed form.
func ApiStatusTypedFromStringList(list []ApiStatusString) []ApiStatusTyped {
	result := make([]ApiStatusTyped, 0, len(list))
	for _, s := range list { result = append(result, NewApiStatusTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ApiStatusTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Code": t.Code,
	}
}

func (t ApiStatusTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewApiStatusTypedFromJSONValue(m map[string]interface{}) (ApiStatusTyped, error) {
	t := ApiStatusTyped{}
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

func NewApiStatusTypedFromJSON(text string) (ApiStatusTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ApiStatusTyped{}, err
	}
	return NewApiStatusTypedFromJSONValue(m)
}

func ApiStatusTypedToJSONList(list []ApiStatusTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ApiStatusTypedFromJSONList(text string) ([]ApiStatusTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ApiStatusTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ApiStatusTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewApiStatusTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
