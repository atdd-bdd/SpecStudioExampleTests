package common

type ItemPriceInputTyped struct {
	TotalItems string
}

func NewItemPriceInputTypedFromString(s ItemPriceInputString) ItemPriceInputTyped {
	t := ItemPriceInputTyped{}
	t.TotalItems = s.TotalItems
	return t
}

// ToItemPriceInputString converts this ItemPriceInputTyped back to the string form a table compares.
func (t ItemPriceInputTyped) ToItemPriceInputString() ItemPriceInputString {
	s := ItemPriceInputString{}
	s.TotalItems = t.TotalItems
	return s
}

// ItemPriceInputTypedToStringList converts a slice of ItemPriceInputTyped to its string form.
func ItemPriceInputTypedToStringList(list []ItemPriceInputTyped) []ItemPriceInputString {
	result := make([]ItemPriceInputString, 0, len(list))
	for _, t := range list { result = append(result, t.ToItemPriceInputString()) }
	return result
}

// ItemPriceInputTypedFromStringList converts a slice of ItemPriceInputString to its typed form.
func ItemPriceInputTypedFromStringList(list []ItemPriceInputString) []ItemPriceInputTyped {
	result := make([]ItemPriceInputTyped, 0, len(list))
	for _, s := range list { result = append(result, NewItemPriceInputTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ItemPriceInputTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"TotalItems": t.TotalItems,
	}
}

func (t ItemPriceInputTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewItemPriceInputTypedFromJSONValue(m map[string]interface{}) (ItemPriceInputTyped, error) {
	t := ItemPriceInputTyped{}
	rawTotalItems, err := JSONRequire(m, "TotalItems")
	if err != nil {
		return t, err
	}
	valTotalItems, err := JSONAsString(rawTotalItems, "TotalItems")
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
