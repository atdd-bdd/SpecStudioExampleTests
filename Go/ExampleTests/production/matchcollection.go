package production

const (
	MatchCollectionMinimum = 0
	MatchCollectionMaximum = 10000
)

type MatchCollection struct {
	items []*Match
}

func NewMatchCollection() *MatchCollection { return &MatchCollection{} }

func (c *MatchCollection) Add(item *Match) {
	c.items = append(c.items, item)
}

func (c *MatchCollection) Delete(item *Match) bool {
	for i, v := range c.items {
		if v == item {
			c.items = append(c.items[:i], c.items[i+1:]...)
			return true
		}
	}
	return false
}

func (c *MatchCollection) Read() []*Match {
	result := make([]*Match, len(c.items))
	copy(result, c.items)
	return result
}

func (c *MatchCollection) Update(oldItem, newItem *Match) bool {
	for i, v := range c.items {
		if v == oldItem {
			c.items[i] = newItem
			return true
		}
	}
	return false
}

func (c *MatchCollection) Size() int { return len(c.items) }
