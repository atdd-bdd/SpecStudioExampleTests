package common

type ShoppingCartTyped struct {
	Items []OrderItemTyped
	Shipping string
	Discount string
	TotalPrice string
	ShippingAddress AddressTyped
	BillingAddress AddressTyped
}

func NewShoppingCartTypedFromString(s ShoppingCartString) ShoppingCartTyped {
	t := ShoppingCartTyped{}
	t.Shipping = s.Shipping
	t.Discount = s.Discount
	t.TotalPrice = s.TotalPrice
	t.ShippingAddress = NewAddressTypedFromString(s.ShippingAddress)
	t.BillingAddress = NewAddressTypedFromString(s.BillingAddress)
	return t
}

// ToShoppingCartString converts this ShoppingCartTyped back to the string form a table compares.
func (t ShoppingCartTyped) ToShoppingCartString() ShoppingCartString {
	s := ShoppingCartString{}
	s.Shipping = t.Shipping
	s.Discount = t.Discount
	s.TotalPrice = t.TotalPrice
	s.ShippingAddress = t.ShippingAddress.ToAddressString()
	s.BillingAddress = t.BillingAddress.ToAddressString()
	return s
}

// ShoppingCartTypedToStringList converts a slice of ShoppingCartTyped to its string form.
func ShoppingCartTypedToStringList(list []ShoppingCartTyped) []ShoppingCartString {
	result := make([]ShoppingCartString, 0, len(list))
	for _, t := range list { result = append(result, t.ToShoppingCartString()) }
	return result
}

// ShoppingCartTypedFromStringList converts a slice of ShoppingCartString to its typed form.
func ShoppingCartTypedFromStringList(list []ShoppingCartString) []ShoppingCartTyped {
	result := make([]ShoppingCartTyped, 0, len(list))
	for _, s := range list { result = append(result, NewShoppingCartTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ShoppingCartTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Items": func() []interface{} {
			out := make([]interface{}, 0, len(t.Items))
			for _, e := range t.Items { out = append(out, e.ToJSONValue()) }
			return out
		}(),
		"Shipping": t.Shipping,
		"Discount": t.Discount,
		"TotalPrice": t.TotalPrice,
		"ShippingAddress": t.ShippingAddress.ToJSONValue(),
		"BillingAddress": t.BillingAddress.ToJSONValue(),
	}
}

func (t ShoppingCartTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewShoppingCartTypedFromJSONValue(m map[string]interface{}) (ShoppingCartTyped, error) {
	t := ShoppingCartTyped{}
	rawItems, err := JSONRequire(m, "Items")
	if err != nil {
		return t, err
	}
	arrItems, err := JSONAsArray(rawItems, "Items")
	if err != nil {
		return t, err
	}
	t.Items = make([]OrderItemTyped, 0, len(arrItems))
	for _, e := range arrItems {
		obj, err := JSONAsObject(e, "Items")
		if err != nil {
			return t, err
		}
		item, err := NewOrderItemTypedFromJSONValue(obj)
		if err != nil {
			return t, err
		}
		t.Items = append(t.Items, item)
	}
	rawShipping, err := JSONRequire(m, "Shipping")
	if err != nil {
		return t, err
	}
	valShipping, err := JSONAsString(rawShipping, "Shipping")
	if err != nil {
		return t, err
	}
	t.Shipping = valShipping
	rawDiscount, err := JSONRequire(m, "Discount")
	if err != nil {
		return t, err
	}
	valDiscount, err := JSONAsString(rawDiscount, "Discount")
	if err != nil {
		return t, err
	}
	t.Discount = valDiscount
	rawTotalPrice, err := JSONRequire(m, "TotalPrice")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "TotalPrice")
	if err != nil {
		return t, err
	}
	t.TotalPrice = valTotalPrice
	rawShippingAddress, err := JSONRequire(m, "ShippingAddress")
	if err != nil {
		return t, err
	}
	valShippingAddress, err := JSONAsObject(rawShippingAddress, "ShippingAddress")
	if err != nil {
		return t, err
	}
	subShippingAddress, err := NewAddressTypedFromJSONValue(valShippingAddress)
	if err != nil {
		return t, err
	}
	t.ShippingAddress = subShippingAddress
	rawBillingAddress, err := JSONRequire(m, "BillingAddress")
	if err != nil {
		return t, err
	}
	valBillingAddress, err := JSONAsObject(rawBillingAddress, "BillingAddress")
	if err != nil {
		return t, err
	}
	subBillingAddress, err := NewAddressTypedFromJSONValue(valBillingAddress)
	if err != nil {
		return t, err
	}
	t.BillingAddress = subBillingAddress
	return t, nil
}

func NewShoppingCartTypedFromJSON(text string) (ShoppingCartTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ShoppingCartTyped{}, err
	}
	return NewShoppingCartTypedFromJSONValue(m)
}

func ShoppingCartTypedToJSONList(list []ShoppingCartTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ShoppingCartTypedFromJSONList(text string) ([]ShoppingCartTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ShoppingCartTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ShoppingCartTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewShoppingCartTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
