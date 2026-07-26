package common

type CartInputTyped struct {
	TotalItems string
	Shipping string
	Discount string
	TotalPrice string
	Notes string
}

func NewCartInputTypedFromString(s CartInputString) CartInputTyped {
	t := CartInputTyped{}
	t.TotalItems = s.TotalItems
	t.Shipping = s.Shipping
	t.Discount = s.Discount
	t.TotalPrice = s.TotalPrice
	t.Notes = s.Notes
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t CartInputTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"totalitems": t.TotalItems,
		"shipping": t.Shipping,
		"discount": t.Discount,
		"total_price": t.TotalPrice,
		"notes": t.Notes,
	}
}

func (t CartInputTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewCartInputTypedFromJSONValue(m map[string]interface{}) (CartInputTyped, error) {
	t := CartInputTyped{}
	rawTotalItems, err := JSONRequire(m, "totalitems")
	if err != nil {
		return t, err
	}
	valTotalItems, err := JSONAsString(rawTotalItems, "totalitems")
	if err != nil {
		return t, err
	}
	t.TotalItems = valTotalItems
	rawShipping, err := JSONRequire(m, "shipping")
	if err != nil {
		return t, err
	}
	valShipping, err := JSONAsString(rawShipping, "shipping")
	if err != nil {
		return t, err
	}
	t.Shipping = valShipping
	rawDiscount, err := JSONRequire(m, "discount")
	if err != nil {
		return t, err
	}
	valDiscount, err := JSONAsString(rawDiscount, "discount")
	if err != nil {
		return t, err
	}
	t.Discount = valDiscount
	rawTotalPrice, err := JSONRequire(m, "total_price")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "total_price")
	if err != nil {
		return t, err
	}
	t.TotalPrice = valTotalPrice
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

func NewCartInputTypedFromJSON(text string) (CartInputTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return CartInputTyped{}, err
	}
	return NewCartInputTypedFromJSONValue(m)
}

func CartInputTypedToJSONList(list []CartInputTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func CartInputTypedFromJSONList(text string) ([]CartInputTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]CartInputTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "CartInputTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewCartInputTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
