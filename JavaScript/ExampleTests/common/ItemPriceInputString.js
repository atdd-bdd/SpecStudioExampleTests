
export class ItemPriceInputString {
  static DNC_STRING = "?DNC?";

  constructor(totalItems = "") {
    this.totalItems = totalItems;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ItemPriceInputString(
      v[0] ?? ""
    );
  }

  toString() {
    return `TotalItems=${this.totalItems}`;
  }

  equals(other) {
    if (!(other instanceof ItemPriceInputString)) return false;
    return (this.totalItems === ItemPriceInputString.DNC_STRING || other.totalItems === ItemPriceInputString.DNC_STRING || this.totalItems === other.totalItems);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
