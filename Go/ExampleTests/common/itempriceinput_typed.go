package common

type ItemPriceInputTyped struct {
	TotalItems string
}

func NewItemPriceInputTypedFromString(s ItemPriceInputString) ItemPriceInputTyped {
	t := ItemPriceInputTyped{}
	t.TotalItems = s.TotalItems
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ItemPriceInputTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"totalitems": t.TotalItems,
	}
}

func (t ItemPriceInputTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewItemPriceInputTypedFromJSONValue(m map[string]interface{}) (ItemPriceInputTyped, error) {
	t := ItemPriceInputTyped{}
	rawTotalItems, err := JSONRequire(m, "totalitems")
	if err != nil {
		return t, err
	}
	valTotalItems, err := JSONAsString(rawTotalItems, "totalitems")
	if err != nil {
		return t, err
	}
	t.TotalItems = valTotalItems
	return t, nil
}

func NewItemPriceInputTypedFromJSON(text string) (ItemPriceInputTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ItemPriceInputTyped{}, err
	}
	return NewItemPriceInputTypedFromJSONValue(m)
}

func ItemPriceInputTypedToJSONList(list []ItemPriceInputTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ItemPriceInputTypedFromJSONList(text string) ([]ItemPriceInputTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ItemPriceInputTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ItemPriceInputTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewItemPriceInputTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
