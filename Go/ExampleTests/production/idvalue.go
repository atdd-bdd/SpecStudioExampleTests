package domain

type IDValue struct {
	ID IDForm
	Value int
}

func NewIDValue(id IDForm, value int) *IDValue {
	return &IDValue{ID: id, Value: value}
}
