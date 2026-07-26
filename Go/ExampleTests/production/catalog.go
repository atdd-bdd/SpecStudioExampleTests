package domain

const (
	CatalogMinimum = 0
	CatalogMaximum = 10000000
)

type Catalog struct {
	items []*CatalogItem
}

func NewCatalog() *Catalog { return &Catalog{} }

func (c *Catalog) Add(item *CatalogItem) {
	c.items = append(c.items, item)
}

func (c *Catalog) Delete(item *CatalogItem) bool {
	for i, v := range c.items {
		if v == item {
			c.items = append(c.items[:i], c.items[i+1:]...)
			return true
		}
	}
	return false
}

func (c *Catalog) Read() []*CatalogItem {
	result := make([]*CatalogItem, len(c.items))
	copy(result, c.items)
	return result
}

func (c *Catalog) Update(oldItem, newItem *CatalogItem) bool {
	for i, v := range c.items {
		if v == oldItem {
			c.items[i] = newItem
			return true
		}
	}
	return false
}

func (c *Catalog) Size() int { return len(c.items) }
