package common

import "fmt"

type OrderItemString struct {
	Name string
	Quantity string
	Price string
	ItemTotal string
}

func NewOrderItemStringFromSlice(v []string) OrderItemString {
	s := OrderItemString{}
	if len(v) > 0 { s.Name = v[0] }
	if len(v) > 1 { s.Quantity = v[1] }
	if len(v) > 2 { s.Price = v[2] }
	if len(v) > 3 { s.ItemTotal = v[3] }
	return s
}

func (s OrderItemString) String() string {
	return fmt.Sprintf("Name=%s, Quantity=%s, Price=%s, ItemTotal=%s", s.Name, s.Quantity, s.Price, s.ItemTotal)
}
