package common

type DiscountInputTyped struct {
	TotalPrice string
	Discount string
	Notes string
}

func NewDiscountInputTypedFromString(s DiscountInputString) DiscountInputTyped {
	t := DiscountInputTyped{}
	t.TotalPrice = s.TotalPrice
	t.Discount = s.Discount
	t.Notes = s.Notes
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t DiscountInputTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"total_price": t.TotalPrice,
		"discount": t.Discount,
		"notes": t.Notes,
	}
}

func (t DiscountInputTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewDiscountInputTypedFromJSONValue(m map[string]interface{}) (DiscountInputTyped, error) {
	t := DiscountInputTyped{}
	rawTotalPrice, err := JSONRequire(m, "total_price")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "total_price")
	if err != nil {
		return t, err
	}
	t.TotalPrice = valTotalPrice
	rawDiscount, err := JSONRequire(m, "discount")
	if err != nil {
		return t, err
	}
	valDiscount, err := JSONAsString(rawDiscount, "discount")
	if err != nil {
		return t, err
	}
	t.Discount = valDiscount
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

func NewDiscountInputTypedFromJSON(text string) (DiscountInputTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return DiscountInputTyped{}, err
	}
	return NewDiscountInputTypedFromJSONValue(m)
}

func DiscountInputTypedToJSONList(list []DiscountInputTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func DiscountInputTypedFromJSONList(text string) ([]DiscountInputTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]DiscountInputTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "DiscountInputTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewDiscountInputTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
