package common

type AddressTyped struct {
	Street string
	City string
	State string
	ZIP string
}

func NewAddressTypedFromString(s AddressString) AddressTyped {
	t := AddressTyped{}
	t.Street = s.Street
	t.City = s.City
	t.State = s.State
	t.ZIP = s.ZIP
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t AddressTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"street": t.Street,
		"city": t.City,
		"state": t.State,
		"zip": t.ZIP,
	}
}

func (t AddressTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewAddressTypedFromJSONValue(m map[string]interface{}) (AddressTyped, error) {
	t := AddressTyped{}
	rawStreet, err := JSONRequire(m, "street")
	if err != nil {
		return t, err
	}
	valStreet, err := JSONAsString(rawStreet, "street")
	if err != nil {
		return t, err
	}
	t.Street = valStreet
	rawCity, err := JSONRequire(m, "city")
	if err != nil {
		return t, err
	}
	valCity, err := JSONAsString(rawCity, "city")
	if err != nil {
		return t, err
	}
	t.City = valCity
	rawState, err := JSONRequire(m, "state")
	if err != nil {
		return t, err
	}
	valState, err := JSONAsString(rawState, "state")
	if err != nil {
		return t, err
	}
	t.State = valState
	rawZIP, err := JSONRequire(m, "zip")
	if err != nil {
		return t, err
	}
	valZIP, err := JSONAsString(rawZIP, "zip")
	if err != nil {
		return t, err
	}
	t.ZIP = valZIP
	return t, nil
}

func NewAddressTypedFromJSON(text string) (AddressTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return AddressTyped{}, err
	}
	return NewAddressTypedFromJSONValue(m)
}

func AddressTypedToJSONList(list []AddressTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func AddressTypedFromJSONList(text string) ([]AddressTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]AddressTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "AddressTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewAddressTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
