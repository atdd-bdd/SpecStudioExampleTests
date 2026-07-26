package domain

type CatalogItem struct {
	Name SimpleText
	Price Dollar
}

func NewCatalogItem(name SimpleText, price Dollar) *CatalogItem {
	return &CatalogItem{Name: name, Price: price}
}
