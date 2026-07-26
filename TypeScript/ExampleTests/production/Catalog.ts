import { CatalogItem } from "./CatalogItem.js";

export class Catalog {
  static MINIMUM = 0;
  static MAXIMUM = 10000000;

  #items: CatalogItem[] = [];

  add(item: CatalogItem): void { this.#items.push(item); }

  delete(item: CatalogItem): boolean {
    const idx = this.#items.indexOf(item);
    if (idx < 0) return false;
    this.#items.splice(idx, 1);
    return true;
  }

  read(): CatalogItem[] { return [...this.#items]; }

  update(oldItem: CatalogItem, newItem: CatalogItem): boolean {
    const idx = this.#items.indexOf(oldItem);
    if (idx < 0) return false;
    this.#items[idx] = newItem;
    return true;
  }

  size(): number { return this.#items.length; }
}
