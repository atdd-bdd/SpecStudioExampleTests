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

// ToCatalogItemString converts this CatalogItemTyped back to the string form a table compares.
func (t CatalogItemTyped) ToCatalogItemString() CatalogItemString {
	s := CatalogItemString{}
	s.Name = t.Name
	s.Price = t.Price
	return s
}

// CatalogItemTypedToStringList converts a slice of CatalogItemTyped to its string form.
func CatalogItemTypedToStringList(list []CatalogItemTyped) []CatalogItemString {
	result := make([]CatalogItemString, 0, len(list))
	for _, t := range list { result = append(result, t.ToCatalogItemString()) }
	return result
}

// CatalogItemTypedFromStringList converts a slice of CatalogItemString to its typed form.
func CatalogItemTypedFromStringList(list []CatalogItemString) []CatalogItemTyped {
	result := make([]CatalogItemTyped, 0, len(list))
	for _, s := range list { result = append(result, NewCatalogItemTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t CatalogItemTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Name": t.Name,
		"Price": t.Price,
	}
}

func (t CatalogItemTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewCatalogItemTypedFromJSONValue(m map[string]interface{}) (CatalogItemTyped, error) {
	t := CatalogItemTyped{}
	rawName, err := JSONRequire(m, "Name")
	if err != nil {
		return t, err
	}
	valName, err := JSONAsString(rawName, "Name")
	if err != nil {
		return t, err
	}
	t.Name = valName
	rawPrice, err := JSONRequire(m, "Price")
	if err != nil {
		return t, err
	}
	valPrice, err := JSONAsString(rawPrice, "Price")
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
