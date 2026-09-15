package common

type RequestTyped struct {
	Method string
	Page string
	Address string
	Benchmark string
	Format string
}

func NewRequestTypedFromString(s RequestString) RequestTyped {
	t := RequestTyped{}
	t.Method = s.Method
	t.Page = s.Page
	t.Address = s.Address
	t.Benchmark = s.Benchmark
	t.Format = s.Format
	return t
}

// ToRequestString converts this RequestTyped back to the string form a table compares.
func (t RequestTyped) ToRequestString() RequestString {
	s := RequestString{}
	s.Method = t.Method
	s.Page = t.Page
	s.Address = t.Address
	s.Benchmark = t.Benchmark
	s.Format = t.Format
	return s
}

// RequestTypedToStringList converts a slice of RequestTyped to its string form.
func RequestTypedToStringList(list []RequestTyped) []RequestString {
	result := make([]RequestString, 0, len(list))
	for _, t := range list { result = append(result, t.ToRequestString()) }
	return result
}

// RequestTypedFromStringList converts a slice of RequestString to its typed form.
func RequestTypedFromStringList(list []RequestString) []RequestTyped {
	result := make([]RequestTyped, 0, len(list))
	for _, s := range list { result = append(result, NewRequestTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t RequestTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"Method": t.Method,
		"Page": t.Page,
		"Address": t.Address,
		"Benchmark": t.Benchmark,
		"Format": t.Format,
	}
}

func (t RequestTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewRequestTypedFromJSONValue(m map[string]interface{}) (RequestTyped, error) {
	t := RequestTyped{}
	rawMethod, err := JSONRequire(m, "Method")
	if err != nil {
		return t, err
	}
	valMethod, err := JSONAsString(rawMethod, "Method")
	if err != nil {
		return t, err
	}
	t.Method = valMethod
	rawPage, err := JSONRequire(m, "Page")
	if err != nil {
		return t, err
	}
	valPage, err := JSONAsString(rawPage, "Page")
	if err != nil {
		return t, err
	}
	t.Page = valPage
	rawAddress, err := JSONRequire(m, "Address")
	if err != nil {
		return t, err
	}
	valAddress, err := JSONAsString(rawAddress, "Address")
	if err != nil {
		return t, err
	}
	t.Address = valAddress
	rawBenchmark, err := JSONRequire(m, "Benchmark")
	if err != nil {
		return t, err
	}
	valBenchmark, err := JSONAsString(rawBenchmark, "Benchmark")
	if err != nil {
		return t, err
	}
	t.Benchmark = valBenchmark
	rawFormat, err := JSONRequire(m, "Format")
	if err != nil {
		return t, err
	}
	valFormat, err := JSONAsString(rawFormat, "Format")
	if err != nil {
		return t, err
	}
	t.Format = valFormat
	return t, nil
}

func NewRequestTypedFromJSON(text string) (RequestTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return RequestTyped{}, err
	}
	return NewRequestTypedFromJSONValue(m)
}

func RequestTypedToJSONList(list []RequestTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func RequestTypedFromJSONList(text string) ([]RequestTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]RequestTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "RequestTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewRequestTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
