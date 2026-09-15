package common

type MatchTyped struct {
	MatchedAddress string
	AddressComponents AddressComponentsTyped
}

func NewMatchTypedFromString(s MatchString) MatchTyped {
	t := MatchTyped{}
	t.MatchedAddress = s.MatchedAddress
	t.AddressComponents = NewAddressComponentsTypedFromString(s.AddressComponents)
	return t
}

// ToMatchString converts this MatchTyped back to the string form a table compares.
func (t MatchTyped) ToMatchString() MatchString {
	s := MatchString{}
	s.MatchedAddress = t.MatchedAddress
	s.AddressComponents = t.AddressComponents.ToAddressComponentsString()
	return s
}

// MatchTypedToStringList converts a slice of MatchTyped to its string form.
func MatchTypedToStringList(list []MatchTyped) []MatchString {
	result := make([]MatchString, 0, len(list))
	for _, t := range list { result = append(result, t.ToMatchString()) }
	return result
}

// MatchTypedFromStringList converts a slice of MatchString to its typed form.
func MatchTypedFromStringList(list []MatchString) []MatchTyped {
	result := make([]MatchTyped, 0, len(list))
	for _, s := range list { result = append(result, NewMatchTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t MatchTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"matchedAddress": t.MatchedAddress,
		"addressComponents": t.AddressComponents.ToJSONValue(),
	}
}

func (t MatchTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewMatchTypedFromJSONValue(m map[string]interface{}) (MatchTyped, error) {
	t := MatchTyped{}
	rawMatchedAddress, err := JSONRequire(m, "matchedAddress")
	if err != nil {
		return t, err
	}
	valMatchedAddress, err := JSONAsString(rawMatchedAddress, "matchedAddress")
	if err != nil {
		return t, err
	}
	t.MatchedAddress = valMatchedAddress
	rawAddressComponents, err := JSONRequire(m, "addressComponents")
	if err != nil {
		return t, err
	}
	valAddressComponents, err := JSONAsObject(rawAddressComponents, "addressComponents")
	if err != nil {
		return t, err
	}
	subAddressComponents, err := NewAddressComponentsTypedFromJSONValue(valAddressComponents)
	if err != nil {
		return t, err
	}
	t.AddressComponents = subAddressComponents
	return t, nil
}

func NewMatchTypedFromJSON(text string) (MatchTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return MatchTyped{}, err
	}
	return NewMatchTypedFromJSONValue(m)
}

func MatchTypedToJSONList(list []MatchTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func MatchTypedFromJSONList(text string) ([]MatchTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]MatchTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "MatchTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewMatchTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
