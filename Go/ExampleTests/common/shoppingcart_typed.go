package common

type ShoppingCartTyped struct {
	Items string
	Shipping string
	Discount string
	TotalPrice string
	ShippingAddress AddressTyped
	BillingAddress AddressTyped
}

func NewShoppingCartTypedFromString(s ShoppingCartString) ShoppingCartTyped {
	t := ShoppingCartTyped{}
	t.Items = s.Items
	t.Shipping = s.Shipping
	t.Discount = s.Discount
	t.TotalPrice = s.TotalPrice
	t.ShippingAddress = NewAddressTypedFromString(s.ShippingAddress)
	t.BillingAddress = NewAddressTypedFromString(s.BillingAddress)
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ShoppingCartTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"items": t.Items,
		"shipping": t.Shipping,
		"discount": t.Discount,
		"totalprice": t.TotalPrice,
		"shippingaddress": t.ShippingAddress.ToJSONValue(),
		"billingaddress": t.BillingAddress.ToJSONValue(),
	}
}

func (t ShoppingCartTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewShoppingCartTypedFromJSONValue(m map[string]interface{}) (ShoppingCartTyped, error) {
	t := ShoppingCartTyped{}
	rawItems, err := JSONRequire(m, "items")
	if err != nil {
		return t, err
	}
	valItems, err := JSONAsString(rawItems, "items")
	if err != nil {
		return t, err
	}
	t.Items = valItems
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
	rawTotalPrice, err := JSONRequire(m, "totalprice")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "totalprice")
	if err != nil {
		return t, err
	}
	t.TotalPrice = valTotalPrice
	rawShippingAddress, err := JSONRequire(m, "shippingaddress")
	if err != nil {
		return t, err
	}
	valShippingAddress, err := JSONAsObject(rawShippingAddress, "shippingaddress")
	if err != nil {
		return t, err
	}
	subShippingAddress, err := NewAddressTypedFromJSONValue(valShippingAddress)
	if err != nil {
		return t, err
	}
	t.ShippingAddress = subShippingAddress
	rawBillingAddress, err := JSONRequire(m, "billingaddress")
	if err != nil {
		return t, err
	}
	valBillingAddress, err := JSONAsObject(rawBillingAddress, "billingaddress")
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
