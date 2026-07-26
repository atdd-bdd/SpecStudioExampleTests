
export class CatalogItemString {
  constructor(name = "", price = "") {
    this.name = name;
    this.price = price;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new CatalogItemString(
      v[0] ?? "",
      v[1] ?? ""
    );
  }

  toString() {
    return `Name=${this.name}, Price=${this.price}`;
  }
}
