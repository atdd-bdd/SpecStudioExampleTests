package common

type CatalogItemTyped struct {
	Name string
	Price string
}

func NewCatalogItemTypedFromString(s CatalogItemString) CatalogItemTyped {
	t := CatalogItemTyped{}
	t.Name = s.Name
	t.Price = s.Price
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t CatalogItemTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"name": t.Name,
		"price": t.Price,
	}
}

func (t CatalogItemTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewCatalogItemTypedFromJSONValue(m map[string]interface{}) (CatalogItemTyped, error) {
	t := CatalogItemTyped{}
	rawName, err := JSONRequire(m, "name")
	if err != nil {
		return t, err
	}
	valName, err := JSONAsString(rawName, "name")
	if err != nil {
		return t, err
	}
	t.Name = valName
	rawPrice, err := JSONRequire(m, "price")
	if err != nil {
		return t, err
	}
	valPrice, err := JSONAsString(rawPrice, "price")
	if err != nil {
		return t, err
	}
	t.Price = valPrice
	return t, nil
}

func NewCatalogItemTypedFromJSON(text string) (CatalogItemTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return CatalogItemTyped{}, err
	}
	return NewCatalogItemTypedFromJSONValue(m)
}

func CatalogItemTypedToJSONList(list []CatalogItemTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func CatalogItemTypedFromJSONList(text string) ([]CatalogItemTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]CatalogItemTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "CatalogItemTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewCatalogItemTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
