package common

type ShippingInputTyped struct {
	TotalPrice string
	ShippingCost string
	Notes string
}

func NewShippingInputTypedFromString(s ShippingInputString) ShippingInputTyped {
	t := ShippingInputTyped{}
	t.TotalPrice = s.TotalPrice
	t.ShippingCost = s.ShippingCost
	t.Notes = s.Notes
	return t
}

// ToShippingInputString converts this ShippingInputTyped back to the string form a table compares.
func (t ShippingInputTyped) ToShippingInputString() ShippingInputString {
	s := ShippingInputString{}
	s.TotalPrice = t.TotalPrice
	s.ShippingCost = t.ShippingCost
	s.Notes = t.Notes
	return s
}

// ShippingInputTypedToStringList converts a slice of ShippingInputTyped to its string form.
func ShippingInputTypedToStringList(list []ShippingInputTyped) []ShippingInputString {
	result := make([]ShippingInputString, 0, len(list))
	for _, t := range list { result = append(result, t.ToShippingInputString()) }
	return result
}

// ShippingInputTypedFromStringList converts a slice of ShippingInputString to its typed form.
func ShippingInputTypedFromStringList(list []ShippingInputString) []ShippingInputTyped {
	result := make([]ShippingInputTyped, 0, len(list))
	for _, s := range list { result = append(result, NewShippingInputTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ShippingInputTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Total Price": t.TotalPrice,
		"Shipping Cost": t.ShippingCost,
		"Notes": t.Notes,
	}
}

func (t ShippingInputTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewShippingInputTypedFromJSONValue(m map[string]interface{}) (ShippingInputTyped, error) {
	t := ShippingInputTyped{}
	rawTotalPrice, err := JSONRequire(m, "Total Price")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "Total Price")
	if err != nil {
		return t, err
	}
	t.TotalPrice = valTotalPrice
	rawShippingCost, err := JSONRequire(m, "Shipping Cost")
	if err != nil {
		return t, err
	}
	valShippingCost, err := JSONAsString(rawShippingCost, "Shipping Cost")
	if err != nil {
		return t, err
	}
	t.ShippingCost = valShippingCost
	rawNotes, err := JSONRequire(m, "Notes")
	if err != nil {
		return t, err
	}
	valNotes, err := JSONAsString(rawNotes, "Notes")
	if err != nil {
		return t, err
	}
	t.Notes = valNotes
	return t, nil
}

func NewShippingInputTypedFromJSON(text string) (ShippingInputTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ShippingInputTyped{}, err
	}
	return NewShippingInputTypedFromJSONValue(m)
}

func ShippingInputTypedToJSONList(list []ShippingInputTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ShippingInputTypedFromJSONList(text string) ([]ShippingInputTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ShippingInputTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ShippingInputTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewShippingInputTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
