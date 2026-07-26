package common

type ShoppingCartTyped struct {
	Items OrderItemCollection
	Shipping Dollar
	Discount Dollar
	TotalPrice Dollar
	ShippingAddress Address
	BillingAddress Address
}

func NewShoppingCartTypedFromString(s ShoppingCartString) ShoppingCartTyped {
	t := ShoppingCartTyped{}
	t.Items = OrderItemCollection(s.Items)
	t.Shipping = Dollar(s.Shipping)
	t.Discount = Dollar(s.Discount)
	t.TotalPrice = Dollar(s.TotalPrice)
	t.ShippingAddress = Address(s.ShippingAddress)
	t.BillingAddress = Address(s.BillingAddress)
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ShoppingCartTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"items": string(t.Items),
		"shipping": string(t.Shipping),
		"discount": string(t.Discount),
		"totalprice": string(t.TotalPrice),
		"shippingaddress": string(t.ShippingAddress),
		"billingaddress": string(t.BillingAddress),
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
	t.Items = OrderItemCollection(valItems)
	rawShipping, err := JSONRequire(m, "shipping")
	if err != nil {
		return t, err
	}
	valShipping, err := JSONAsString(rawShipping, "shipping")
	if err != nil {
		return t, err
	}
	t.Shipping = Dollar(valShipping)
	rawDiscount, err := JSONRequire(m, "discount")
	if err != nil {
		return t, err
	}
	valDiscount, err := JSONAsString(rawDiscount, "discount")
	if err != nil {
		return t, err
	}
	t.Discount = Dollar(valDiscount)
	rawTotalPrice, err := JSONRequire(m, "totalprice")
	if err != nil {
		return t, err
	}
	valTotalPrice, err := JSONAsString(rawTotalPrice, "totalprice")
	if err != nil {
		return t, err
	}
	t.TotalPrice = Dollar(valTotalPrice)
	rawShippingAddress, err := JSONRequire(m, "shippingaddress")
	if err != nil {
		return t, err
	}
	valShippingAddress, err := JSONAsString(rawShippingAddress, "shippingaddress")
	if err != nil {
		return t, err
	}
	t.ShippingAddress = Address(valShippingAddress)
	rawBillingAddress, err := JSONRequire(m, "billingaddress")
	if err != nil {
		return t, err
	}
	valBillingAddress, err := JSONAsString(rawBillingAddress, "billingaddress")
	if err != nil {
		return t, err
	}
	t.BillingAddress = Address(valBillingAddress)
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
