package common

type DiscountingTyped struct {
	TotalPrice Dollar
	Discount Percentage
	Notes string
}

func NewDiscountingTypedFromString(s DiscountingString) DiscountingTyped {
	t := DiscountingTyped{}
	t.TotalPrice = Dollar(s.TotalPrice)
	t.Discount = Percentage(s.Discount)
	t.Notes = s.Notes
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t DiscountingTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"total_price": string(t.TotalPrice),
		"discount": string(t.Discount),
		"notes": t.Notes,
	}
}

func (t DiscountingTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewDiscountingTypedFromJSONValue(m map[string]interface{}) (DiscountingTyped, error) {
	t := DiscountingTyped{}
	rawTotalPrice, err := JSONRequire(m, "total_price")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "total_price")
	if err != nil {
		return t, err
	}
	t.TotalPrice = Dollar(valTotalPrice)
	rawDiscount, err := JSONRequire(m, "discount")
	if err != nil {
		return t, err
	}
	valDiscount, err := JSONAsString(rawDiscount, "discount")
	if err != nil {
		return t, err
	}
	t.Discount = Percentage(valDiscount)
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

func NewDiscountingTypedFromJSON(text string) (DiscountingTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return DiscountingTyped{}, err
	}
	return NewDiscountingTypedFromJSONValue(m)
}

func DiscountingTypedToJSONList(list []DiscountingTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func DiscountingTypedFromJSONList(text string) ([]DiscountingTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]DiscountingTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "DiscountingTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewDiscountingTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
