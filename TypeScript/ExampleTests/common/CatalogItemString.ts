
export class CatalogItemString {
  static readonly DNC_STRING = "?DNC?";

  name: string;
  price: string;

  constructor(name: string = "", price: string = "") {
    this.name = name;
    this.price = price;
  }

  static fromList(values: Iterable<string>): CatalogItemString {
    const v = Array.from(values);
    const r = new CatalogItemString();
    r.name = v[0] ?? "";
    r.price = v[1] ?? "";
    return r;
  }

  toString(): string {
    return `Name=${this.name}, Price=${this.price}`;
  }

  equals(other: CatalogItemString): boolean {
    return (this.name === CatalogItemString.DNC_STRING || other.name === CatalogItemString.DNC_STRING || this.name === other.name)
      && (this.price === CatalogItemString.DNC_STRING || other.price === CatalogItemString.DNC_STRING || this.price === other.price);
  }

  static equalLists(a: CatalogItemString[], b: CatalogItemString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
