import { OrderItem } from "./OrderItem.js";

export class OrderItemCollection {
  static MINIMUM = 0;
  static MAXIMUM = 100;

  #items = [];

  add(item) { this.#items.push(item); }

  delete(item) {
    const idx = this.#items.indexOf(item);
    if (idx < 0) return false;
    this.#items.splice(idx, 1);
    return true;
  }

  read() { return [...this.#items]; }

  update(oldItem, newItem) {
    const idx = this.#items.indexOf(oldItem);
    if (idx < 0) return false;
    this.#items[idx] = newItem;
    return true;
  }

  size() { return this.#items.length; }
}
