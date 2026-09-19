package common

import "strconv"

type NewPostTyped struct {
	Title string
	Body string
	UserId int
}

func NewNewPostTypedFromString(s NewPostString) NewPostTyped {
	t := NewPostTyped{}
	t.Title = s.Title
	t.Body = s.Body
	if v, err := strconv.Atoi(s.UserId); err == nil { t.UserId = v }
	return t
}

// ToNewPostString converts this NewPostTyped back to the string form a table compares.
func (t NewPostTyped) ToNewPostString() NewPostString {
	s := NewPostString{}
	s.Title = t.Title
	s.Body = t.Body
	s.UserId = strconv.Itoa(t.UserId)
	return s
}

// NewPostTypedToStringList converts a slice of NewPostTyped to its string form.
func NewPostTypedToStringList(list []NewPostTyped) []NewPostString {
	result := make([]NewPostString, 0, len(list))
	for _, t := range list { result = append(result, t.ToNewPostString()) }
	return result
}

// NewPostTypedFromStringList converts a slice of NewPostString to its typed form.
func NewPostTypedFromStringList(list []NewPostString) []NewPostTyped {
	result := make([]NewPostTyped, 0, len(list))
	for _, s := range list { result = append(result, NewNewPostTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t NewPostTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"title": t.Title,
		"body": t.Body,
		"userId": t.UserId,
	}
}

func (t NewPostTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewNewPostTypedFromJSONValue(m map[string]interface{}) (NewPostTyped, error) {
	t := NewPostTyped{}
	rawTitle, err := JSONRequire(m, "title")
	if err != nil {
		return t, err
	}
	valTitle, err := JSONAsString(rawTitle, "title")
	if err != nil {
		return t, err
	}
	t.Title = valTitle
	rawBody, err := JSONRequire(m, "body")
	if err != nil {
		return t, err
	}
	valBody, err := JSONAsString(rawBody, "body")
	if err != nil {
		return t, err
	}
	t.Body = valBody
	rawUserId, err := JSONRequire(m, "userId")
	if err != nil {
		return t, err
	}
	valUserId, err := JSONAsInt(rawUserId, "userId")
	if err != nil {
		return t, err
	}
	t.UserId = valUserId
	return t, nil
}

func NewNewPostTypedFromJSON(text string) (NewPostTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return NewPostTyped{}, err
	}
	return NewNewPostTypedFromJSONValue(m)
}

func NewPostTypedToJSONList(list []NewPostTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func NewPostTypedFromJSONList(text string) ([]NewPostTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]NewPostTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "NewPostTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewNewPostTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
