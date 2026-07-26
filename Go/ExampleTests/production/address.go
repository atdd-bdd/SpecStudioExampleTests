package domain

type Address struct {
	Street SimpleText
	City SimpleText
	State SimpleText
	ZIP SimpleText
}

func NewAddress(street SimpleText, city SimpleText, state SimpleText, zip SimpleText) *Address {
	return &Address{Street: street, City: city, State: state, ZIP: zip}
}
