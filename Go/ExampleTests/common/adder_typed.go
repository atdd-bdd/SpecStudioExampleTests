package common

import "strconv"

type AdderTyped struct {
	Number1 int
	Number2 int
	Result int
}

func NewAdderTypedFromString(s AdderString) AdderTyped {
	t := AdderTyped{}
	if v, err := strconv.Atoi(s.Number1); err == nil { t.Number1 = v }
	if v, err := strconv.Atoi(s.Number2); err == nil { t.Number2 = v }
	if v, err := strconv.Atoi(s.Result); err == nil { t.Result = v }
	return t
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t AdderTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"number1": t.Number1,
		"number2": t.Number2,
		"result": t.Result,
	}
}

func (t AdderTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewAdderTypedFromJSONValue(m map[string]interface{}) (AdderTyped, error) {
	t := AdderTyped{}
	rawNumber1, err := JSONRequire(m, "number1")
	if err != nil {
		return t, err
	}
	valNumber1, err := JSONAsInt(rawNumber1, "number1")
	if err != nil {
		return t, err
	}
	t.Number1 = valNumber1
	rawNumber2, err := JSONRequire(m, "number2")
	if err != nil {
		return t, err
	}
	valNumber2, err := JSONAsInt(rawNumber2, "number2")
	if err != nil {
		return t, err
	}
	t.Number2 = valNumber2
	rawResult, err := JSONRequire(m, "result")
	if err != nil {
		return t, err
	}
	valResult, err := JSONAsInt(rawResult, "result")
	if err != nil {
		return t, err
	}
	t.Result = valResult
	return t, nil
}

func NewAdderTypedFromJSON(text string) (AdderTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return AdderTyped{}, err
	}
	return NewAdderTypedFromJSONValue(m)
}

func AdderTypedToJSONList(list []AdderTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func AdderTypedFromJSONList(text string) ([]AdderTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]AdderTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "AdderTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewAdderTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
