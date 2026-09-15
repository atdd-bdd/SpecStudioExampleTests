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

// ToFandCString converts this FandCTyped back to the string form a table compares.
func (t FandCTyped) ToFandCString() FandCString {
	s := FandCString{}
	s.F = strconv.Itoa(t.F)
	s.C = strconv.Itoa(t.C)
	s.Notes = t.Notes
	return s
}

// FandCTypedToStringList converts a slice of FandCTyped to its string form.
func FandCTypedToStringList(list []FandCTyped) []FandCString {
	result := make([]FandCString, 0, len(list))
	for _, t := range list { result = append(result, t.ToFandCString()) }
	return result
}

// FandCTypedFromStringList converts a slice of FandCString to its typed form.
func FandCTypedFromStringList(list []FandCString) []FandCTyped {
	result := make([]FandCTyped, 0, len(list))
	for _, s := range list { result = append(result, NewFandCTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t FandCTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"F": t.F,
		"C": t.C,
		"Notes": t.Notes,
	}
}

func (t FandCTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewFandCTypedFromJSONValue(m map[string]interface{}) (FandCTyped, error) {
	t := FandCTyped{}
	rawF, err := JSONRequire(m, "F")
	if err != nil {
		return t, err
	}
	valF, err := JSONAsInt(rawF, "F")
	if err != nil {
		return t, err
	}
	t.F = valF
	rawC, err := JSONRequire(m, "C")
	if err != nil {
		return t, err
	}
	valC, err := JSONAsInt(rawC, "C")
	if err != nil {
		return t, err
	}
	t.C = valC
	rawNotes, err := JSONRequire(m, "Notes")
	if err != nil {
		return t, err
	}
	valNotes, err := JSONAsString(rawNotes, "Notes")
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
