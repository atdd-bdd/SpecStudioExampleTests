import { Match } from "./Match.js";

export class MatchCollection {
  static MINIMUM = 0;
  static MAXIMUM = 10000;

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
