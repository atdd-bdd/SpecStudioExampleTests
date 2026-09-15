package common

type AddressComponentsTyped struct {
	Zip string
	StreetName string
	City string
	PreDirection string
	SuffixDirection string
	State string
	SuffixType string
}

func NewAddressComponentsTypedFromString(s AddressComponentsString) AddressComponentsTyped {
	t := AddressComponentsTyped{}
	t.Zip = s.Zip
	t.StreetName = s.StreetName
	t.City = s.City
	t.PreDirection = s.PreDirection
	t.SuffixDirection = s.SuffixDirection
	t.State = s.State
	t.SuffixType = s.SuffixType
	return t
}

// ToAddressComponentsString converts this AddressComponentsTyped back to the string form a table compares.
func (t AddressComponentsTyped) ToAddressComponentsString() AddressComponentsString {
	s := AddressComponentsString{}
	s.Zip = t.Zip
	s.StreetName = t.StreetName
	s.City = t.City
	s.PreDirection = t.PreDirection
	s.SuffixDirection = t.SuffixDirection
	s.State = t.State
	s.SuffixType = t.SuffixType
	return s
}

// AddressComponentsTypedToStringList converts a slice of AddressComponentsTyped to its string form.
func AddressComponentsTypedToStringList(list []AddressComponentsTyped) []AddressComponentsString {
	result := make([]AddressComponentsString, 0, len(list))
	for _, t := range list { result = append(result, t.ToAddressComponentsString()) }
	return result
}

// AddressComponentsTypedFromStringList converts a slice of AddressComponentsString to its typed form.
func AddressComponentsTypedFromStringList(list []AddressComponentsString) []AddressComponentsTyped {
	result := make([]AddressComponentsTyped, 0, len(list))
	for _, s := range list { result = append(result, NewAddressComponentsTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t AddressComponentsTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"zip": t.Zip,
		"streetName": t.StreetName,
		"city": t.City,
		"preDirection": t.PreDirection,
		"suffixDirection": t.SuffixDirection,
		"state": t.State,
		"suffixType": t.SuffixType,
	}
}

func (t AddressComponentsTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewAddressComponentsTypedFromJSONValue(m map[string]interface{}) (AddressComponentsTyped, error) {
	t := AddressComponentsTyped{}
	rawZip, err := JSONRequire(m, "zip")
	if err != nil {
		return t, err
	}
	valZip, err := JSONAsString(rawZip, "zip")
	if err != nil {
		return t, err
	}
	t.Zip = valZip
	rawStreetName, err := JSONRequire(m, "streetName")
	if err != nil {
		return t, err
	}
	valStreetName, err := JSONAsString(rawStreetName, "streetName")
	if err != nil {
		return t, err
	}
	t.StreetName = valStreetName
	rawCity, err := JSONRequire(m, "city")
	if err != nil {
		return t, err
	}
	valCity, err := JSONAsString(rawCity, "city")
	if err != nil {
		return t, err
	}
	t.City = valCity
	rawPreDirection, err := JSONRequire(m, "preDirection")
	if err != nil {
		return t, err
	}
	valPreDirection, err := JSONAsString(rawPreDirection, "preDirection")
	if err != nil {
		return t, err
	}
	t.PreDirection = valPreDirection
	rawSuffixDirection, err := JSONRequire(m, "suffixDirection")
	if err != nil {
		return t, err
	}
	valSuffixDirection, err := JSONAsString(rawSuffixDirection, "suffixDirection")
	if err != nil {
		return t, err
	}
	t.SuffixDirection = valSuffixDirection
	rawState, err := JSONRequire(m, "state")
	if err != nil {
		return t, err
	}
	valState, err := JSONAsString(rawState, "state")
	if err != nil {
		return t, err
	}
	t.State = valState
	rawSuffixType, err := JSONRequire(m, "suffixType")
	if err != nil {
		return t, err
	}
	valSuffixType, err := JSONAsString(rawSuffixType, "suffixType")
	if err != nil {
		return t, err
	}
	t.SuffixType = valSuffixType
	return t, nil
}

func NewAddressComponentsTypedFromJSON(text string) (AddressComponentsTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return AddressComponentsTyped{}, err
	}
	return NewAddressComponentsTypedFromJSONValue(m)
}

func AddressComponentsTypedToJSONList(list []AddressComponentsTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func AddressComponentsTypedFromJSONList(text string) ([]AddressComponentsTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]AddressComponentsTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "AddressComponentsTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewAddressComponentsTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
