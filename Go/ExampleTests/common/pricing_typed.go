package common

type PricingTyped struct {
	TotalPrice string
}

func NewPricingTypedFromString(s PricingString) PricingTyped {
	t := PricingTyped{}
	t.TotalPrice = s.TotalPrice
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t PricingTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"totalprice": t.TotalPrice,
	}
}

func (t PricingTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewPricingTypedFromJSONValue(m map[string]interface{}) (PricingTyped, error) {
	t := PricingTyped{}
	rawTotalPrice, err := JSONRequire(m, "totalprice")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "totalprice")
	if err != nil {
		return t, err
	}
	t.TotalPrice = valTotalPrice
	return t, nil
}

func NewPricingTypedFromJSON(text string) (PricingTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return PricingTyped{}, err
	}
	return NewPricingTypedFromJSONValue(m)
}

func PricingTypedToJSONList(list []PricingTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func PricingTypedFromJSONList(text string) ([]PricingTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]PricingTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "PricingTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewPricingTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
