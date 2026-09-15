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

// ToDiscountInputString converts this DiscountInputTyped back to the string form a table compares.
func (t DiscountInputTyped) ToDiscountInputString() DiscountInputString {
	s := DiscountInputString{}
	s.TotalPrice = t.TotalPrice
	s.Discount = t.Discount
	s.Notes = t.Notes
	return s
}

// DiscountInputTypedToStringList converts a slice of DiscountInputTyped to its string form.
func DiscountInputTypedToStringList(list []DiscountInputTyped) []DiscountInputString {
	result := make([]DiscountInputString, 0, len(list))
	for _, t := range list { result = append(result, t.ToDiscountInputString()) }
	return result
}

// DiscountInputTypedFromStringList converts a slice of DiscountInputString to its typed form.
func DiscountInputTypedFromStringList(list []DiscountInputString) []DiscountInputTyped {
	result := make([]DiscountInputTyped, 0, len(list))
	for _, s := range list { result = append(result, NewDiscountInputTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t DiscountInputTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Total Price": t.TotalPrice,
		"Discount": t.Discount,
		"Notes": t.Notes,
	}
}

func (t DiscountInputTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewDiscountInputTypedFromJSONValue(m map[string]interface{}) (DiscountInputTyped, error) {
	t := DiscountInputTyped{}
	rawTotalPrice, err := JSONRequire(m, "Total Price")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "Total Price")
	if err != nil {
		return t, err
	}
	t.TotalPrice = valTotalPrice
	rawDiscount, err := JSONRequire(m, "Discount")
	if err != nil {
		return t, err
	}
	valDiscount, err := JSONAsString(rawDiscount, "Discount")
	if err != nil {
		return t, err
	}
	t.Discount = valDiscount
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
