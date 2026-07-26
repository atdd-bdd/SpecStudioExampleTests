package common

type ShippingTyped struct {
	TotalPrice Dollar
	ShippingCost Dollar
	Notes string
}

func NewShippingTypedFromString(s ShippingString) ShippingTyped {
	t := ShippingTyped{}
	t.TotalPrice = Dollar(s.TotalPrice)
	t.ShippingCost = Dollar(s.ShippingCost)
	t.Notes = s.Notes
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ShippingTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"total_price": string(t.TotalPrice),
		"shipping_cost": string(t.ShippingCost),
		"notes": t.Notes,
	}
}

func (t ShippingTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewShippingTypedFromJSONValue(m map[string]interface{}) (ShippingTyped, error) {
	t := ShippingTyped{}
	rawTotalPrice, err := JSONRequire(m, "total_price")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "total_price")
	if err != nil {
		return t, err
	}
	t.TotalPrice = Dollar(valTotalPrice)
	rawShippingCost, err := JSONRequire(m, "shipping_cost")
	if err != nil {
		return t, err
	}
	valShippingCost, err := JSONAsString(rawShippingCost, "shipping_cost")
	if err != nil {
		return t, err
	}
	t.ShippingCost = Dollar(valShippingCost)
	rawNotes, err := JSONRequire(m, "notes")
	if err != nil {
		return t, err
	}
	valNotes, err := JSONAsString(rawNotes, "notes")
	if err != nil {
		return t, err
	}
	t.Notes = valNotes
	return t, nil
}

func NewShippingTypedFromJSON(text string) (ShippingTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ShippingTyped{}, err
	}
	return NewShippingTypedFromJSONValue(m)
}

func ShippingTypedToJSONList(list []ShippingTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ShippingTypedFromJSONList(text string) ([]ShippingTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ShippingTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ShippingTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewShippingTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
