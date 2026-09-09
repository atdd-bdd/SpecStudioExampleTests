package common

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

// NewOrderItemStringFromText builds from the text form, e.g. Money as "25 USD".
func NewOrderItemStringFromText(text string) OrderItemString {
	parts := RequireTokens(text, 4, "OrderItem")
	return OrderItemString{
		Name: parts[0],
		Quantity: parts[1],
		Price: parts[2],
		ItemTotal: parts[3],
	}
}

func (s OrderItemString) String() string {
	return Token(s.Name) + " " + Token(s.Quantity) + " " + Token(s.Price) + " " + Token(s.ItemTotal)
}

func (s OrderItemString) Equals(o OrderItemString) bool {
	return DNCEqual(s.Name, o.Name) &&
		DNCEqual(s.Quantity, o.Quantity) &&
		DNCEqual(s.Price, o.Price) &&
		DNCEqual(s.ItemTotal, o.ItemTotal)
}

func EqualOrderItemStringSlices(a, b []OrderItemString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
