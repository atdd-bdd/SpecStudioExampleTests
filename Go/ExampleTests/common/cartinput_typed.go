package common

type CartInputTyped struct {
	TotalItems DollarTyped
	Shipping DollarTyped
	Discount DollarTyped
	TotalPrice DollarTyped
	Notes string
}

func NewCartInputTypedFromString(s CartInputString) CartInputTyped {
	t := CartInputTyped{}
	t.TotalItems = NewDollarTypedFromString(s.TotalItems)
	t.Shipping = NewDollarTypedFromString(s.Shipping)
	t.Discount = NewDollarTypedFromString(s.Discount)
	t.TotalPrice = NewDollarTypedFromString(s.TotalPrice)
	t.Notes = s.Notes
	return t
}

// ToCartInputString converts this CartInputTyped back to the string form a table compares.
func (t CartInputTyped) ToCartInputString() CartInputString {
	s := CartInputString{}
	s.TotalItems = t.TotalItems.ToDollarString()
	s.Shipping = t.Shipping.ToDollarString()
	s.Discount = t.Discount.ToDollarString()
	s.TotalPrice = t.TotalPrice.ToDollarString()
	s.Notes = t.Notes
	return s
}

// CartInputTypedToStringList converts a slice of CartInputTyped to its string form.
func CartInputTypedToStringList(list []CartInputTyped) []CartInputString {
	result := make([]CartInputString, 0, len(list))
	for _, t := range list { result = append(result, t.ToCartInputString()) }
	return result
}

// CartInputTypedFromStringList converts a slice of CartInputString to its typed form.
func CartInputTypedFromStringList(list []CartInputString) []CartInputTyped {
	result := make([]CartInputTyped, 0, len(list))
	for _, s := range list { result = append(result, NewCartInputTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t CartInputTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"TotalItems": t.TotalItems.String(),
		"Shipping": t.Shipping.String(),
		"Discount": t.Discount.String(),
		"Total Price": t.TotalPrice.String(),
		"Notes": t.Notes,
	}
}

func (t CartInputTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewCartInputTypedFromJSONValue(m map[string]interface{}) (CartInputTyped, error) {
	t := CartInputTyped{}
	rawTotalItems, err := JSONRequire(m, "TotalItems")
	if err != nil {
		return t, err
	}
	valTotalItems, err := JSONAsString(rawTotalItems, "TotalItems")
	if err != nil {
		return t, err
	}
	t.TotalItems = NewDollarTyped(valTotalItems)
	rawShipping, err := JSONRequire(m, "Shipping")
	if err != nil {
		return t, err
	}
	valShipping, err := JSONAsString(rawShipping, "Shipping")
	if err != nil {
		return t, err
	}
	t.Shipping = NewDollarTyped(valShipping)
	rawDiscount, err := JSONRequire(m, "Discount")
	if err != nil {
		return t, err
	}
	valDiscount, err := JSONAsString(rawDiscount, "Discount")
	if err != nil {
		return t, err
	}
	t.Discount = NewDollarTyped(valDiscount)
	rawTotalPrice, err := JSONRequire(m, "Total Price")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "Total Price")
	if err != nil {
		return t, err
	}
	t.TotalPrice = NewDollarTyped(valTotalPrice)
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
