package common

type ResponseTyped struct {
	Result ResultTyped
}

func NewResponseTypedFromString(s ResponseString) ResponseTyped {
	t := ResponseTyped{}
	t.Result = NewResultTypedFromString(s.Result)
	return t
}

// ToResponseString converts this ResponseTyped back to the string form a table compares.
func (t ResponseTyped) ToResponseString() ResponseString {
	s := ResponseString{}
	s.Result = t.Result.ToResultString()
	return s
}

// ResponseTypedToStringList converts a slice of ResponseTyped to its string form.
func ResponseTypedToStringList(list []ResponseTyped) []ResponseString {
	result := make([]ResponseString, 0, len(list))
	for _, t := range list { result = append(result, t.ToResponseString()) }
	return result
}

// ResponseTypedFromStringList converts a slice of ResponseString to its typed form.
func ResponseTypedFromStringList(list []ResponseString) []ResponseTyped {
	result := make([]ResponseTyped, 0, len(list))
	for _, s := range list { result = append(result, NewResponseTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ResponseTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"result": t.Result.ToJSONValue(),
	}
}

func (t ResponseTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewResponseTypedFromJSONValue(m map[string]interface{}) (ResponseTyped, error) {
	t := ResponseTyped{}
	rawResult, err := JSONRequire(m, "result")
	if err != nil {
		return t, err
	}
	valResult, err := JSONAsObject(rawResult, "result")
	if err != nil {
		return t, err
	}
	subResult, err := NewResultTypedFromJSONValue(valResult)
	if err != nil {
		return t, err
	}
	t.Result = subResult
	return t, nil
}

func NewResponseTypedFromJSON(text string) (ResponseTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ResponseTyped{}, err
	}
	return NewResponseTypedFromJSONValue(m)
}

func ResponseTypedToJSONList(list []ResponseTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ResponseTypedFromJSONList(text string) ([]ResponseTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ResponseTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ResponseTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewResponseTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
