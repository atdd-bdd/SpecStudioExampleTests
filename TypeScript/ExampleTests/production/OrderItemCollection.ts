import { OrderItem } from "./OrderItem.js";

export class OrderItemCollection {
  static MINIMUM = 0;
  static MAXIMUM = 100;

  #items: OrderItem[] = [];

  add(item: OrderItem): void { this.#items.push(item); }

  delete(item: OrderItem): boolean {
    const idx = this.#items.indexOf(item);
    if (idx < 0) return false;
    this.#items.splice(idx, 1);
    return true;
  }

  read(): OrderItem[] { return [...this.#items]; }

  update(oldItem: OrderItem, newItem: OrderItem): boolean {
    const idx = this.#items.indexOf(oldItem);
    if (idx < 0) return false;
    this.#items[idx] = newItem;
    return true;
  }

  size(): number { return this.#items.length; }
}
