package domain

const (
	OrderItemCollectionMinimum = 0
	OrderItemCollectionMaximum = 100
)

type OrderItemCollection struct {
	items []*OrderItem
}

func NewOrderItemCollection() *OrderItemCollection { return &OrderItemCollection{} }

func (c *OrderItemCollection) Add(item *OrderItem) {
	c.items = append(c.items, item)
}

func (c *OrderItemCollection) Delete(item *OrderItem) bool {
	for i, v := range c.items {
		if v == item {
			c.items = append(c.items[:i], c.items[i+1:]...)
			return true
		}
	}
	return false
}

func (c *OrderItemCollection) Read() []*OrderItem {
	result := make([]*OrderItem, len(c.items))
	copy(result, c.items)
	return result
}

func (c *OrderItemCollection) Update(oldItem, newItem *OrderItem) bool {
	for i, v := range c.items {
		if v == oldItem {
			c.items[i] = newItem
			return true
		}
	}
	return false
}

func (c *OrderItemCollection) Size() int { return len(c.items) }
