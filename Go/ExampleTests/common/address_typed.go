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

// ToAddressString converts this AddressTyped back to the string form a table compares.
func (t AddressTyped) ToAddressString() AddressString {
	s := AddressString{}
	s.Street = t.Street
	s.City = t.City
	s.State = t.State
	s.ZIP = t.ZIP
	return s
}

// AddressTypedToStringList converts a slice of AddressTyped to its string form.
func AddressTypedToStringList(list []AddressTyped) []AddressString {
	result := make([]AddressString, 0, len(list))
	for _, t := range list { result = append(result, t.ToAddressString()) }
	return result
}

// AddressTypedFromStringList converts a slice of AddressString to its typed form.
func AddressTypedFromStringList(list []AddressString) []AddressTyped {
	result := make([]AddressTyped, 0, len(list))
	for _, s := range list { result = append(result, NewAddressTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t AddressTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Street": t.Street,
		"City": t.City,
		"State": t.State,
		"ZIP": t.ZIP,
	}
}

func (t AddressTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewAddressTypedFromJSONValue(m map[string]interface{}) (AddressTyped, error) {
	t := AddressTyped{}
	rawStreet, err := JSONRequire(m, "Street")
	if err != nil {
		return t, err
	}
	valStreet, err := JSONAsString(rawStreet, "Street")
	if err != nil {
		return t, err
	}
	t.Street = valStreet
	rawCity, err := JSONRequire(m, "City")
	if err != nil {
		return t, err
	}
	valCity, err := JSONAsString(rawCity, "City")
	if err != nil {
		return t, err
	}
	t.City = valCity
	rawState, err := JSONRequire(m, "State")
	if err != nil {
		return t, err
	}
	valState, err := JSONAsString(rawState, "State")
	if err != nil {
		return t, err
	}
	t.State = valState
	rawZIP, err := JSONRequire(m, "ZIP")
	if err != nil {
		return t, err
	}
	valZIP, err := JSONAsString(rawZIP, "ZIP")
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
