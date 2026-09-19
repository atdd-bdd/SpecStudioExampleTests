package common

import "strconv"

type ReplacePostTyped struct {
	Id int
	UserId int
	Title string
	Body string
}

func NewReplacePostTypedFromString(s ReplacePostString) ReplacePostTyped {
	t := ReplacePostTyped{}
	if v, err := strconv.Atoi(s.Id); err == nil { t.Id = v }
	if v, err := strconv.Atoi(s.UserId); err == nil { t.UserId = v }
	t.Title = s.Title
	t.Body = s.Body
	return t
}

// ToReplacePostString converts this ReplacePostTyped back to the string form a table compares.
func (t ReplacePostTyped) ToReplacePostString() ReplacePostString {
	s := ReplacePostString{}
	s.Id = strconv.Itoa(t.Id)
	s.UserId = strconv.Itoa(t.UserId)
	s.Title = t.Title
	s.Body = t.Body
	return s
}

// ReplacePostTypedToStringList converts a slice of ReplacePostTyped to its string form.
func ReplacePostTypedToStringList(list []ReplacePostTyped) []ReplacePostString {
	result := make([]ReplacePostString, 0, len(list))
	for _, t := range list { result = append(result, t.ToReplacePostString()) }
	return result
}

// ReplacePostTypedFromStringList converts a slice of ReplacePostString to its typed form.
func ReplacePostTypedFromStringList(list []ReplacePostString) []ReplacePostTyped {
	result := make([]ReplacePostTyped, 0, len(list))
	for _, s := range list { result = append(result, NewReplacePostTypedFromString(s)) }
	return result
}

// ToJSONValue renders the struct as a plain map for encoding/json.
func (t ReplacePostTyped) ToJSONValue() map[string]interface{} {
	return map[string]interface{}{
		"id": t.Id,
		"userId": t.UserId,
		"title": t.Title,
		"body": t.Body,
	}
}

func (t ReplacePostTyped) ToJSON() (string, error) {
	return JSONWrite(t.ToJSONValue())
}

func NewReplacePostTypedFromJSONValue(m map[string]interface{}) (ReplacePostTyped, error) {
	t := ReplacePostTyped{}
	rawId, err := JSONRequire(m, "id")
	if err != nil {
		return t, err
	}
	valId, err := JSONAsInt(rawId, "id")
	if err != nil {
		return t, err
	}
	t.Id = valId
	rawUserId, err := JSONRequire(m, "userId")
	if err != nil {
		return t, err
	}
	valUserId, err := JSONAsInt(rawUserId, "userId")
	if err != nil {
		return t, err
	}
	t.UserId = valUserId
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

func NewReplacePostTypedFromJSON(text string) (ReplacePostTyped, error) {
	m, err := JSONParseObject(text)
	if err != nil {
		return ReplacePostTyped{}, err
	}
	return NewReplacePostTypedFromJSONValue(m)
}

func ReplacePostTypedToJSONList(list []ReplacePostTyped) (string, error) {
	arr := make([]interface{}, 0, len(list))
	for _, item := range list {
		arr = append(arr, item.ToJSONValue())
	}
	return JSONWrite(arr)
}

func ReplacePostTypedFromJSONList(text string) ([]ReplacePostTyped, error) {
	raw, err := JSONParseArray(text)
	if err != nil {
		return nil, err
	}
	result := make([]ReplacePostTyped, 0, len(raw))
	for _, e := range raw {
		m, err := JSONAsObject(e, "ReplacePostTyped")
		if err != nil {
			return nil, err
		}
		item, err := NewReplacePostTypedFromJSONValue(m)
		if err != nil {
			return nil, err
		}
		result = append(result, item)
	}
	return result, nil
}
