export class CatalogItem {
  name: SimpleText;
  price: Dollar;

  constructor(name: SimpleText = NoName, price: Dollar = 1) {
    this.name = name;
    this.price = price;
  }
}
