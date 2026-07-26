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

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t OrderItemTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"name": t.Name,
		"quantity": t.Quantity,
		"price": t.Price,
		"itemtotal": t.ItemTotal,
	}
}

func (t OrderItemTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewOrderItemTypedFromJSONValue(m map[string]interface{}) (OrderItemTyped, error) {
	t := OrderItemTyped{}
	rawName, err := JSONRequire(m, "name")
	if err != nil {
		return t, err
	}
	valName, err := JSONAsString(rawName, "name")
	if err != nil {
		return t, err
	}
	t.Name = valName
	rawQuantity, err := JSONRequire(m, "quantity")
	if err != nil {
		return t, err
	}
	valQuantity, err := JSONAsInt(rawQuantity, "quantity")
	if err != nil {
		return t, err
	}
	t.Quantity = valQuantity
	rawPrice, err := JSONRequire(m, "price")
	if err != nil {
		return t, err
	}
	valPrice, err := JSONAsString(rawPrice, "price")
	if err != nil {
		return t, err
	}
	t.Price = valPrice
	rawItemTotal, err := JSONRequire(m, "itemtotal")
	if err != nil {
		return t, err
	}
	valItemTotal, err := JSONAsString(rawItemTotal, "itemtotal")
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
