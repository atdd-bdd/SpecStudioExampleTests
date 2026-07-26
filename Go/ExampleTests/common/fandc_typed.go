package common

import "strconv"

type FandCTyped struct {
	F int
	C int
	Notes string
}

func NewFandCTypedFromString(s FandCString) FandCTyped {
	t := FandCTyped{}
	if v, err := strconv.Atoi(s.F); err == nil { t.F = v }
	if v, err := strconv.Atoi(s.C); err == nil { t.C = v }
	t.Notes = s.Notes
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t FandCTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"f": t.F,
		"c": t.C,
		"notes": t.Notes,
	}
}

func (t FandCTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewFandCTypedFromJSONValue(m map[string]interface{}) (FandCTyped, error) {
	t := FandCTyped{}
	rawF, err := JSONRequire(m, "f")
	if err != nil {
		return t, err
	}
	valF, err := JSONAsInt(rawF, "f")
	if err != nil {
		return t, err
	}
	t.F = valF
	rawC, err := JSONRequire(m, "c")
	if err != nil {
		return t, err
	}
	valC, err := JSONAsInt(rawC, "c")
	if err != nil {
		return t, err
	}
	t.C = valC
	rawNotes, err := JSONRequire(m, "notes")
	if err != nil {
		return t, err
	}
	valNotes, err := JSONAsString(rawNotes, "notes")
	if err != nil {
		return t, err
	}
	t.Notes = valNotes
	return t, nil
}

func NewFandCTypedFromJSON(text string) (FandCTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return FandCTyped{}, err
	}
	return NewFandCTypedFromJSONValue(m)
}

func FandCTypedToJSONList(list []FandCTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func FandCTypedFromJSONList(text string) ([]FandCTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]FandCTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "FandCTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewFandCTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
