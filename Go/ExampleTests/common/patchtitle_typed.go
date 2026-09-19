package common

type PatchTitleTyped struct {
	Title string
}

func NewPatchTitleTypedFromString(s PatchTitleString) PatchTitleTyped {
	t := PatchTitleTyped{}
	t.Title = s.Title
	return t
}

// ToPatchTitleString converts this PatchTitleTyped back to the string form a table compares.
func (t PatchTitleTyped) ToPatchTitleString() PatchTitleString {
	s := PatchTitleString{}
	s.Title = t.Title
	return s
}

// PatchTitleTypedToStringList converts a slice of PatchTitleTyped to its string form.
func PatchTitleTypedToStringList(list []PatchTitleTyped) []PatchTitleString {
	result := make([]PatchTitleString, 0, len(list))
	for _, t := range list { result = append(result, t.ToPatchTitleString()) }
	return result
}

// PatchTitleTypedFromStringList converts a slice of PatchTitleString to its typed form.
func PatchTitleTypedFromStringList(list []PatchTitleString) []PatchTitleTyped {
	result := make([]PatchTitleTyped, 0, len(list))
	for _, s := range list { result = append(result, NewPatchTitleTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t PatchTitleTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"title": t.Title,
	}
}

func (t PatchTitleTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewPatchTitleTypedFromJSONValue(m map[string]interface{}) (PatchTitleTyped, error) {
	t := PatchTitleTyped{}
	rawTitle, err := JSONRequire(m, "title")
	if err != nil {
		return t, err
	}
	valTitle, err := JSONAsString(rawTitle, "title")
	if err != nil {
		return t, err
	}
	t.Title = valTitle
	return t, nil
}

func NewPatchTitleTypedFromJSON(text string) (PatchTitleTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return PatchTitleTyped{}, err
	}
	return NewPatchTitleTypedFromJSONValue(m)
}

func PatchTitleTypedToJSONList(list []PatchTitleTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func PatchTitleTypedFromJSONList(text string) ([]PatchTitleTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]PatchTitleTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "PatchTitleTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewPatchTitleTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
