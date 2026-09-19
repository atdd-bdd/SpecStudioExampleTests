package common

type ApiRequestTyped struct {
	Method string
	Page string
	Parameter string
	Body string
}

func NewApiRequestTypedFromString(s ApiRequestString) ApiRequestTyped {
	t := ApiRequestTyped{}
	t.Method = s.Method
	t.Page = s.Page
	t.Parameter = s.Parameter
	t.Body = s.Body
	return t
}

// ToApiRequestString converts this ApiRequestTyped back to the string form a table compares.
func (t ApiRequestTyped) ToApiRequestString() ApiRequestString {
	s := ApiRequestString{}
	s.Method = t.Method
	s.Page = t.Page
	s.Parameter = t.Parameter
	s.Body = t.Body
	return s
}

// ApiRequestTypedToStringList converts a slice of ApiRequestTyped to its string form.
func ApiRequestTypedToStringList(list []ApiRequestTyped) []ApiRequestString {
	result := make([]ApiRequestString, 0, len(list))
	for _, t := range list { result = append(result, t.ToApiRequestString()) }
	return result
}

// ApiRequestTypedFromStringList converts a slice of ApiRequestString to its typed form.
func ApiRequestTypedFromStringList(list []ApiRequestString) []ApiRequestTyped {
	result := make([]ApiRequestTyped, 0, len(list))
	for _, s := range list { result = append(result, NewApiRequestTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ApiRequestTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Method": t.Method,
		"Page": t.Page,
		"Parameter": t.Parameter,
		"Body": t.Body,
	}
}

func (t ApiRequestTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewApiRequestTypedFromJSONValue(m map[string]interface{}) (ApiRequestTyped, error) {
	t := ApiRequestTyped{}
	rawMethod, err := JSONRequire(m, "Method")
	if err != nil {
		return t, err
	}
	valMethod, err := JSONAsString(rawMethod, "Method")
	if err != nil {
		return t, err
	}
	t.Method = valMethod
	rawPage, err := JSONRequire(m, "Page")
	if err != nil {
		return t, err
	}
	valPage, err := JSONAsString(rawPage, "Page")
	if err != nil {
		return t, err
	}
	t.Page = valPage
	rawParameter, err := JSONRequire(m, "Parameter")
	if err != nil {
		return t, err
	}
	valParameter, err := JSONAsString(rawParameter, "Parameter")
	if err != nil {
		return t, err
	}
	t.Parameter = valParameter
	rawBody, err := JSONRequire(m, "Body")
	if err != nil {
		return t, err
	}
	valBody, err := JSONAsString(rawBody, "Body")
	if err != nil {
		return t, err
	}
	t.Body = valBody
	return t, nil
}

func NewApiRequestTypedFromJSON(text string) (ApiRequestTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ApiRequestTyped{}, err
	}
	return NewApiRequestTypedFromJSONValue(m)
}

func ApiRequestTypedToJSONList(list []ApiRequestTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ApiRequestTypedFromJSONList(text string) ([]ApiRequestTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ApiRequestTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ApiRequestTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewApiRequestTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
