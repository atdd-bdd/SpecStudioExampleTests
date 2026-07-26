package common

// Field accessors over encoding/json.
//
// A missing key or a value of the wrong type returns an error. An explicit
// JSON null is passed through as the zero value rather than treated as an
// error.

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
)

func jsonDecode(text string) (interface{}, error) {
	dec := json.NewDecoder(strings.NewReader(text))
	dec.UseNumber() // keep numbers exact instead of coercing to float64
	var v interface{}
	if err := dec.Decode(&v); err != nil {
		return nil, fmt.Errorf("invalid JSON: %w", err)
	}
	// Reject trailing content after the first value. More() peeks at the next
	// non-whitespace byte, so it catches invalid trailing bytes too; Token()
	// would return an error for those and be mistaken for a clean end of input.
	if dec.More() {
		return nil, fmt.Errorf("invalid JSON: trailing content after top-level value")
	}
	return v, nil
}

// JSONParseObject parses JSON text that must hold an object.
func JSONParseObject(text string) (map[string]interface{}, error) {
	v, err := jsonDecode(text)
	if err != nil {
		return nil, err
	}
	m, ok := v.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("expected a JSON object, got %s", jsonDescribe(v))
	}
	return m, nil
}

// JSONParseArray parses JSON text that must hold an array.
func JSONParseArray(text string) ([]interface{}, error) {
	v, err := jsonDecode(text)
	if err != nil {
		return nil, err
	}
	a, ok := v.([]interface{})
	if !ok {
		return nil, fmt.Errorf("expected a JSON array, got %s", jsonDescribe(v))
	}
	return a, nil
}

// JSONWrite serializes a value graph without escaping HTML characters.
func JSONWrite(v interface{}) (string, error) {
	var buf bytes.Buffer
	enc := json.NewEncoder(&buf)
	enc.SetEscapeHTML(false)
	if err := enc.Encode(v); err != nil {
		return "", err
	}
	return strings.TrimRight(buf.String(), "\n"), nil
}

func jsonDescribe(v interface{}) string {
	switch v.(type) {
	case nil:
		return "null"
	case bool:
		return "a boolean"
	case json.Number, float64:
		return "a number"
	case string:
		return "a string"
	case []interface{}:
		return "an array"
	case map[string]interface{}:
		return "an object"
	}
	return fmt.Sprintf("%T", v)
}

func jsonTypeError(ctx, expected string, actual interface{}) error {
	return fmt.Errorf("JSON field '%s' is not %s (got %s)", ctx, expected, jsonDescribe(actual))
}

// JSONRequire returns the named member, or an error when it is absent.
func JSONRequire(m map[string]interface{}, key string) (interface{}, error) {
	if m == nil {
		return nil, fmt.Errorf("expected an object holding field '%s'", key)
	}
	v, ok := m[key]
	if !ok {
		return nil, fmt.Errorf("missing JSON field '%s'", key)
	}
	return v, nil
}

// JSONAsString coerces a JSON scalar to a string.
func JSONAsString(v interface{}, ctx string) (string, error) {
	switch t := v.(type) {
	case nil:
		return "", nil
	case string:
		return t, nil
	case json.Number:
		return t.String(), nil
	case float64:
		return strconv.FormatFloat(t, 'g', -1, 64), nil
	case bool:
		if t {
			return "true", nil
		}
		return "false", nil
	}
	return "", jsonTypeError(ctx, "a string", v)
}

// JSONAsFloat coerces a JSON number (or numeric string) to float64.
func JSONAsFloat(v interface{}, ctx string) (float64, error) {
	switch t := v.(type) {
	case json.Number:
		f, err := t.Float64()
		if err != nil {
			return 0, jsonTypeError(ctx, "a number", v)
		}
		return f, nil
	case float64:
		return t, nil
	case string:
		f, err := strconv.ParseFloat(strings.TrimSpace(t), 64)
		if err != nil {
			return 0, jsonTypeError(ctx, "a number", v)
		}
		return f, nil
	}
	return 0, jsonTypeError(ctx, "a number", v)
}

// JSONAsInt accepts 7 and 7.0 for an integer field, but not 7.5.
func JSONAsInt(v interface{}, ctx string) (int, error) {
	if n, ok := v.(json.Number); ok {
		if i, err := n.Int64(); err == nil {
			return int(i), nil
		}
	}
	f, err := JSONAsFloat(v, ctx)
	if err != nil {
		return 0, err
	}
	i := int(f)
	if float64(i) != f {
		return 0, jsonTypeError(ctx, "an integer", v)
	}
	return i, nil
}

// JSONAsBool accepts a JSON boolean or the usual truthy/falsy spellings.
func JSONAsBool(v interface{}, ctx string) (bool, error) {
	switch t := v.(type) {
	case bool:
		return t, nil
	case string:
		switch strings.ToLower(strings.TrimSpace(t)) {
		case "true", "t", "yes", "y", "1":
			return true, nil
		case "false", "f", "no", "n", "0":
			return false, nil
		}
	}
	return false, jsonTypeError(ctx, "a boolean", v)
}

// JSONAsObject asserts that a value is a JSON object.
func JSONAsObject(v interface{}, ctx string) (map[string]interface{}, error) {
	if v == nil {
		return nil, nil
	}
	m, ok := v.(map[string]interface{})
	if !ok {
		return nil, jsonTypeError(ctx, "an object", v)
	}
	return m, nil
}
