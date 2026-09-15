import { Match } from "./Match.js";

export class MatchCollection {
  static MINIMUM = 0;
  static MAXIMUM = 10000;

  #items: Match[] = [];

  add(item: Match): void { this.#items.push(item); }

  delete(item: Match): boolean {
    const idx = this.#items.indexOf(item);
    if (idx < 0) return false;
    this.#items.splice(idx, 1);
    return true;
  }

  read(): Match[] { return [...this.#items]; }

  update(oldItem: Match, newItem: Match): boolean {
    const idx = this.#items.indexOf(oldItem);
    if (idx < 0) return false;
    this.#items[idx] = newItem;
    return true;
  }

  size(): number { return this.#items.length; }
}
