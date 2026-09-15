package common

import "strconv"

type OrderItemTyped struct {
	Name string
	Quantity int
	Price string
	ItemTotal string
}

func NewOrderItemTypedFromString(s OrderItemString) OrderItemTyped {
	t := OrderItemTyped{}
	t.Name = s.Name
	if v, err := strconv.Atoi(s.Quantity); err == nil { t.Quantity = v }
	t.Price = s.Price
	t.ItemTotal = s.ItemTotal
	return t
}

// ToOrderItemString converts this OrderItemTyped back to the string form a table compares.
func (t OrderItemTyped) ToOrderItemString() OrderItemString {
	s := OrderItemString{}
	s.Name = t.Name
	s.Quantity = strconv.Itoa(t.Quantity)
	s.Price = t.Price
	s.ItemTotal = t.ItemTotal
	return s
}

// OrderItemTypedToStringList converts a slice of OrderItemTyped to its string form.
func OrderItemTypedToStringList(list []OrderItemTyped) []OrderItemString {
	result := make([]OrderItemString, 0, len(list))
	for _, t := range list { result = append(result, t.ToOrderItemString()) }
	return result
}

// OrderItemTypedFromStringList converts a slice of OrderItemString to its typed form.
func OrderItemTypedFromStringList(list []OrderItemString) []OrderItemTyped {
	result := make([]OrderItemTyped, 0, len(list))
	for _, s := range list { result = append(result, NewOrderItemTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t OrderItemTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Name": t.Name,
		"Quantity": t.Quantity,
		"Price": t.Price,
		"ItemTotal": t.ItemTotal,
	}
}

func (t OrderItemTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewOrderItemTypedFromJSONValue(m map[string]interface{}) (OrderItemTyped, error) {
	t := OrderItemTyped{}
	rawName, err := JSONRequire(m, "Name")
	if err != nil {
		return t, err
	}
	valName, err := JSONAsString(rawName, "Name")
	if err != nil {
		return t, err
	}
	t.Name = valName
	rawQuantity, err := JSONRequire(m, "Quantity")
	if err != nil {
		return t, err
	}
	valQuantity, err := JSONAsInt(rawQuantity, "Quantity")
	if err != nil {
		return t, err
	}
	t.Quantity = valQuantity
	rawPrice, err := JSONRequire(m, "Price")
	if err != nil {
		return t, err
	}
	valPrice, err := JSONAsString(rawPrice, "Price")
	if err != nil {
		return t, err
	}
	t.Price = valPrice
	rawItemTotal, err := JSONRequire(m, "ItemTotal")
	if err != nil {
		return t, err
	}
	valItemTotal, err := JSONAsString(rawItemTotal, "ItemTotal")
	if err != nil {
		return t, err
	}
	t.ItemTotal = valItemTotal
	return t, nil
}

func NewOrderItemTypedFromJSON(text string) (OrderItemTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return OrderItemTyped{}, err
	}
	return NewOrderItemTypedFromJSONValue(m)
}

func OrderItemTypedToJSONList(list []OrderItemTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func OrderItemTypedFromJSONList(text string) ([]OrderItemTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]OrderItemTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "OrderItemTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewOrderItemTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
