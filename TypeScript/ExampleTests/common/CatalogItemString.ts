
export class CatalogItemString {
  name: string;
  price: string;

  constructor(name: string = "", price: string = "") {
    this.name = name;
    this.price = price;
  }

  static fromList(values: Iterable<string>): CatalogItemString {
    const v = Array.from(values);
    return new CatalogItemString(
      v[0] ?? "",
      v[1] ?? ""
    );
  }

  toString(): string {
    return `Name=${this.name}, Price=${this.price}`;
  }
}
