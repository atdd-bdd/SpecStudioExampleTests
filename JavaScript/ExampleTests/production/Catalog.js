import { CatalogItem } from "./CatalogItem.js";

export class Catalog {
  static MINIMUM = 0;
  static MAXIMUM = 10000000;

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
