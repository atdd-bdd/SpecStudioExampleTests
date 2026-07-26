package domain

type ShoppingCart struct {
	Items OrderItemCollection
	Shipping Dollar
	Discount Dollar
	TotalPrice Dollar
	ShippingAddress Address
	BillingAddress Address
}

func NewShoppingCart(items OrderItemCollection, shipping Dollar, discount Dollar, totalprice Dollar, shippingaddress Address, billingaddress Address) *ShoppingCart {
	return &ShoppingCart{Items: items, Shipping: shipping, Discount: discount, TotalPrice: totalprice, ShippingAddress: shippingaddress, BillingAddress: billingaddress}
}
