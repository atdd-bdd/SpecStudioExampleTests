package production

// The entities and collections the Shopping Cart and Record Filter
// specifications describe.

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

type IDValue struct {
	ID    IDForm
	Value int
}

func NewIDValue(id IDForm, value int) IDValue { return IDValue{ID: id, Value: value} }

// RecordFilter holds IDValue records and sums the ones carrying a given ID.
type RecordFilter struct {
	entries []IDValue
}

func NewRecordFilter() *RecordFilter { return &RecordFilter{} }

func (r *RecordFilter) Add(entry IDValue) { r.entries = append(r.entries, entry) }

func (r *RecordFilter) SumByLabel(filterLabel IDForm) int {
	sum := 0
	for _, e := range r.entries {
		if e.ID == filterLabel {
			sum += e.Value
		}
	}
	return sum
}

// FahrenheitToCelsius truncates toward zero, so -40F comes out -40C.
func FahrenheitToCelsius(fahrenheit int) int { return (fahrenheit - 32) * 5 / 9 }

// ---------------------------------------------------------------------------
// Calculator
// ---------------------------------------------------------------------------

type Calculator struct{}

func NewCalculator() *Calculator          { return &Calculator{} }
func (c *Calculator) Add(a, b int) int    { return a + b }

// ---------------------------------------------------------------------------
// Shopping
// ---------------------------------------------------------------------------

type Address struct {
	Street SimpleText
	City   SimpleText
	State  SimpleText
	ZIP    SimpleText
}

type CatalogItem struct {
	Name  SimpleText
	Price Dollar
}

func NewCatalogItem(name SimpleText, price Dollar) CatalogItem {
	return CatalogItem{Name: name, Price: price}
}

const (
	CatalogMinimum = 0
	CatalogMaximum = 10000000
)

// Catalog is the items on offer, each with the price an order line is charged.
type Catalog struct {
	items []CatalogItem
}

func NewCatalog() *Catalog { return &Catalog{} }

func (c *Catalog) Add(item CatalogItem) { c.items = append(c.items, item) }
func (c *Catalog) Read() []CatalogItem  { return c.items }
func (c *Catalog) Size() int            { return len(c.items) }

func (c *Catalog) PriceFor(name SimpleText) (Dollar, bool) {
	for _, i := range c.items {
		if i.Name == name {
			return i.Price, true
		}
	}
	return Dollar{}, false
}

type OrderItem struct {
	Name      SimpleText
	Quantity  int
	Price     Dollar
	ItemTotal Dollar
}

func NewOrderItem(name SimpleText, quantity int, price, itemTotal Dollar) OrderItem {
	return OrderItem{Name: name, Quantity: quantity, Price: price, ItemTotal: itemTotal}
}

func CreateOrderItem(name SimpleText, quantity int, price Dollar) OrderItem {
	return NewOrderItem(name, quantity, price, price.Times(quantity))
}

// OrderItemFromCatalog looks the price up rather than being told it.
func OrderItemFromCatalog(catalog *Catalog, name SimpleText, quantity int) (OrderItem, bool) {
	price, ok := catalog.PriceFor(name)
	if !ok {
		return OrderItem{}, false
	}
	return CreateOrderItem(name, quantity, price), true
}

const (
	OrderItemCollectionMinimum = 0
	OrderItemCollectionMaximum = 100
)

type OrderItemCollection struct {
	items []OrderItem
}

func NewOrderItemCollection() *OrderItemCollection { return &OrderItemCollection{} }

func (o *OrderItemCollection) Add(item OrderItem) { o.items = append(o.items, item) }
func (o *OrderItemCollection) Read() []OrderItem  { return o.items }
func (o *OrderItemCollection) Size() int          { return len(o.items) }

func (o *OrderItemCollection) ComputeTotal() Dollar {
	total := Dollar{}
	for _, i := range o.items {
		total = total.Plus(i.ItemTotal)
	}
	return total
}

type ShoppingCart struct {
	Items           *OrderItemCollection
	Shipping        Dollar
	Discount        Dollar
	TotalPrice      Dollar
	ShippingAddress Address
	BillingAddress  Address
}

func NewShoppingCart(items *OrderItemCollection) *ShoppingCart {
	return &ShoppingCart{Items: items}
}

// --- the two business rules ------------------------------------------------

// ShippingCostFor is free once the order reaches $100, otherwise a flat $5.
func ShippingCostFor(totalPrice Dollar) Dollar {
	if totalPrice.Cents() >= 10000 {
		return DollarFromCents(0)
	}
	return DollarFromCents(500)
}

// DiscountFor is tiered: under $25 nothing, to $99.99 five percent, $100 up ten.
func DiscountFor(totalPrice Dollar) Percentage {
	switch c := totalPrice.Cents(); {
	case c >= 10000:
		return NewPercentage(10)
	case c >= 2500:
		return NewPercentage(5)
	default:
		return NewPercentage(0)
	}
}

// --- the Total Cart Price rule, over a bare item total ---------------------
//
// Stated as functions of the item total so the rule can be checked straight from
// its Examples table, which gives a TotalItems figure and no items. "Discount
// applied before shipping calculated", per that table's own note.

// DiscountAmountFor is the discount as money: the tiered percentage of the total.
func DiscountAmountFor(totalItems Dollar) Dollar {
	return totalItems.PercentOf(DiscountFor(totalItems))
}

// ShippingFor is judged on what the customer pays, so after the discount.
func ShippingFor(totalItems Dollar) Dollar {
	return ShippingCostFor(totalItems.Minus(DiscountAmountFor(totalItems)))
}

// TotalPriceFor is the item total, less the discount, plus shipping.
func TotalPriceFor(totalItems Dollar) Dollar {
	return totalItems.Minus(DiscountAmountFor(totalItems)).Plus(ShippingFor(totalItems))
}

// --- what this cart comes to -----------------------------------------------

// Subtotal is what the items come to before any discount or shipping.
func (s *ShoppingCart) Subtotal() Dollar { return s.Items.ComputeTotal() }

func (s *ShoppingCart) DiscountAmount() Dollar { return DiscountAmountFor(s.Subtotal()) }

func (s *ShoppingCart) ShippingCost() Dollar { return ShippingFor(s.Subtotal()) }

func (s *ShoppingCart) ComputeTotal() Dollar { return TotalPriceFor(s.Subtotal()) }
