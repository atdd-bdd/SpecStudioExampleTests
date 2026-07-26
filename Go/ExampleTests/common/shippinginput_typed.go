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

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ShippingInputTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"total_price": t.TotalPrice,
		"shipping_cost": t.ShippingCost,
		"notes": t.Notes,
	}
}

func (t ShippingInputTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewShippingInputTypedFromJSONValue(m map[string]interface{}) (ShippingInputTyped, error) {
	t := ShippingInputTyped{}
	rawTotalPrice, err := JSONRequire(m, "total_price")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "total_price")
	if err != nil {
		return t, err
	}
	t.TotalPrice = valTotalPrice
	rawShippingCost, err := JSONRequire(m, "shipping_cost")
	if err != nil {
		return t, err
	}
	valShippingCost, err := JSONAsString(rawShippingCost, "shipping_cost")
	if err != nil {
		return t, err
	}
	t.ShippingCost = valShippingCost
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
