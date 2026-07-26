export class OrderItem {
  name: SimpleText;
  quantity: number;
  price: Dollar;
  itemTotal: Dollar;

  constructor(name: SimpleText = No Name, quantity: number = 1, price: Dollar = 1, itemTotal: Dollar = 1) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }
}
