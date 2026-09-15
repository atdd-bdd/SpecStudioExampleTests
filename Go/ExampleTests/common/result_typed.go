package common

type ResultTyped struct {
	AddressMatches []MatchTyped
}

func NewResultTypedFromString(s ResultString) ResultTyped {
	t := ResultTyped{}
	return t
}

// ToResultString converts this ResultTyped back to the string form a table compares.
func (t ResultTyped) ToResultString() ResultString {
	s := ResultString{}
	return s
}

// ResultTypedToStringList converts a slice of ResultTyped to its string form.
func ResultTypedToStringList(list []ResultTyped) []ResultString {
	result := make([]ResultString, 0, len(list))
	for _, t := range list { result = append(result, t.ToResultString()) }
	return result
}

// ResultTypedFromStringList converts a slice of ResultString to its typed form.
func ResultTypedFromStringList(list []ResultString) []ResultTyped {
	result := make([]ResultTyped, 0, len(list))
	for _, s := range list { result = append(result, NewResultTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ResultTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"addressMatches": func() []interface{} {
			out := make([]interface{}, 0, len(t.AddressMatches))
			for _, e := range t.AddressMatches { out = append(out, e.ToJSONValue()) }
			return out
		}(),
	}
}

func (t ResultTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewResultTypedFromJSONValue(m map[string]interface{}) (ResultTyped, error) {
	t := ResultTyped{}
	rawAddressMatches, err := JSONRequire(m, "addressMatches")
	if err != nil {
		return t, err
	}
	arrAddressMatches, err := JSONAsArray(rawAddressMatches, "addressMatches")
	if err != nil {
		return t, err
	}
	t.AddressMatches = make([]MatchTyped, 0, len(arrAddressMatches))
	for _, e := range arrAddressMatches {
		obj, err := JSONAsObject(e, "addressMatches")
		if err != nil {
			return t, err
		}
		item, err := NewMatchTypedFromJSONValue(obj)
		if err != nil {
			return t, err
		}
		t.AddressMatches = append(t.AddressMatches, item)
	}
	return t, nil
}

func NewResultTypedFromJSON(text string) (ResultTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ResultTyped{}, err
	}
	return NewResultTypedFromJSONValue(m)
}

func ResultTypedToJSONList(list []ResultTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ResultTypedFromJSONList(text string) ([]ResultTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ResultTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ResultTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewResultTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
