package common

import "strconv"

type PostTyped struct {
	UserId int
	Id int
	Title string
	Body string
}

func NewPostTypedFromString(s PostString) PostTyped {
	t := PostTyped{}
	if v, err := strconv.Atoi(s.UserId); err == nil { t.UserId = v }
	if v, err := strconv.Atoi(s.Id); err == nil { t.Id = v }
	t.Title = s.Title
	t.Body = s.Body
	return t
}

// ToPostString converts this PostTyped back to the string form a table compares.
func (t PostTyped) ToPostString() PostString {
	s := PostString{}
	s.UserId = strconv.Itoa(t.UserId)
	s.Id = strconv.Itoa(t.Id)
	s.Title = t.Title
	s.Body = t.Body
	return s
}

// PostTypedToStringList converts a slice of PostTyped to its string form.
func PostTypedToStringList(list []PostTyped) []PostString {
	result := make([]PostString, 0, len(list))
	for _, t := range list { result = append(result, t.ToPostString()) }
	return result
}

// PostTypedFromStringList converts a slice of PostString to its typed form.
func PostTypedFromStringList(list []PostString) []PostTyped {
	result := make([]PostTyped, 0, len(list))
	for _, s := range list { result = append(result, NewPostTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t PostTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"userId": t.UserId,
		"id": t.Id,
		"title": t.Title,
		"body": t.Body,
	}
}

func (t PostTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewPostTypedFromJSONValue(m map[string]interface{}) (PostTyped, error) {
	t := PostTyped{}
	rawUserId, err := JSONRequire(m, "userId")
	if err != nil {
		return t, err
	}
	valUserId, err := JSONAsInt(rawUserId, "userId")
	if err != nil {
		return t, err
	}
	t.UserId = valUserId
	rawId, err := JSONRequire(m, "id")
	if err != nil {
		return t, err
	}
	valId, err := JSONAsInt(rawId, "id")
	if err != nil {
		return t, err
	}
	t.Id = valId
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
	return t, nil
}

func NewPostTypedFromJSON(text string) (PostTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return PostTyped{}, err
	}
	return NewPostTypedFromJSONValue(m)
}

func PostTypedToJSONList(list []PostTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func PostTypedFromJSONList(text string) ([]PostTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]PostTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "PostTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewPostTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
