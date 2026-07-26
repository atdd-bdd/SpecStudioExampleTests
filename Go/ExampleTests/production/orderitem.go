package domain

type OrderItem struct {
	Name SimpleText
	Quantity int
	Price Dollar
	ItemTotal Dollar
}

func NewOrderItem(name SimpleText, quantity int, price Dollar, itemtotal Dollar) *OrderItem {
	return &OrderItem{Name: name, Quantity: quantity, Price: price, ItemTotal: itemtotal}
}
