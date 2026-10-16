package common

type OrderItemString struct {
	Name SimpleTextString
	Quantity string
	Price DollarString
	ItemTotal DollarString
}

func NewOrderItemStringFromSlice(v []string) OrderItemString {
	s := OrderItemString{}
	if len(v) > 0 { s.Name = SimpleTextString(v[0]) }
	if len(v) > 1 { s.Quantity = v[1] }
	if len(v) > 2 { s.Price = DollarString(v[2]) }
	if len(v) > 3 { s.ItemTotal = DollarString(v[3]) }
	return s
}

// NewOrderItemStringFromText builds from the text form, e.g. Money as "25 USD".
func NewOrderItemStringFromText(text string) OrderItemString {
	parts := RequireTokens(text, 4, "OrderItem")
	return OrderItemString{
		Name: SimpleTextString(parts[0]),
		Quantity: parts[1],
		Price: DollarString(parts[2]),
		ItemTotal: DollarString(parts[3]),
	}
}

func (s OrderItemString) String() string {
	return Token(string(s.Name)) + " " + Token(s.Quantity) + " " + Token(string(s.Price)) + " " + Token(string(s.ItemTotal))
}

func (s OrderItemString) Equals(o OrderItemString) bool {
	return DNCEqual(string(s.Name), string(o.Name)) &&
		DNCEqual(s.Quantity, o.Quantity) &&
		DNCEqual(string(s.Price), string(o.Price)) &&
		DNCEqual(string(s.ItemTotal), string(o.ItemTotal))
}

func EqualOrderItemStringSlices(a, b []OrderItemString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
