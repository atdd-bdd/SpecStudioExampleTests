package common

type AddressTyped struct {
	Street SimpleText
	City SimpleText
	State SimpleText
	ZIP SimpleText
}

func NewAddressTypedFromString(s AddressString) AddressTyped {
	t := AddressTyped{}
	t.Street = SimpleText(s.Street)
	t.City = SimpleText(s.City)
	t.State = SimpleText(s.State)
	t.ZIP = SimpleText(s.ZIP)
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t AddressTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"street": string(t.Street),
		"city": string(t.City),
		"state": string(t.State),
		"zip": string(t.ZIP),
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
	t.Street = SimpleText(valStreet)
	rawCity, err := JSONRequire(m, "city")
	if err != nil {
		return t, err
	}
	valCity, err := JSONAsString(rawCity, "city")
	if err != nil {
		return t, err
	}
	t.City = SimpleText(valCity)
	rawState, err := JSONRequire(m, "state")
	if err != nil {
		return t, err
	}
	valState, err := JSONAsString(rawState, "state")
	if err != nil {
		return t, err
	}
	t.State = SimpleText(valState)
	rawZIP, err := JSONRequire(m, "zip")
	if err != nil {
		return t, err
	}
	valZIP, err := JSONAsString(rawZIP, "zip")
	if err != nil {
		return t, err
	}
	t.ZIP = SimpleText(valZIP)
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
