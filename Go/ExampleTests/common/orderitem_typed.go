package common

import "strconv"

type OrderItemTyped struct {
	Name SimpleText
	Quantity int
	Price Dollar
	ItemTotal Dollar
}

func NewOrderItemTypedFromString(s OrderItemString) OrderItemTyped {
	t := OrderItemTyped{}
	t.Name = SimpleText(s.Name)
	if v, err := strconv.Atoi(s.Quantity); err == nil { t.Quantity = v }
	t.Price = Dollar(s.Price)
	t.ItemTotal = Dollar(s.ItemTotal)
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t OrderItemTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"name": string(t.Name),
		"quantity": t.Quantity,
		"price": string(t.Price),
		"itemtotal": string(t.ItemTotal),
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
	t.Name = SimpleText(valName)
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
	t.Price = Dollar(valPrice)
	rawItemTotal, err := JSONRequire(m, "itemtotal")
	if err != nil {
		return t, err
	}
	valItemTotal, err := JSONAsString(rawItemTotal, "itemtotal")
	if err != nil {
		return t, err
	}
	t.ItemTotal = Dollar(valItemTotal)
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
