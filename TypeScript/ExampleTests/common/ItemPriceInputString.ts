
export class ItemPriceInputString {
  static readonly DNC_STRING = "?DNC?";

  totalItems: string;

  constructor(totalItems: string = "") {
    this.totalItems = totalItems;
  }

  static fromList(values: Iterable<string>): ItemPriceInputString {
    const v = Array.from(values);
    const r = new ItemPriceInputString();
    r.totalItems = v[0] ?? "";
    return r;
  }

  toString(): string {
    return `TotalItems=${this.totalItems}`;
  }

  equals(other: ItemPriceInputString): boolean {
    return (this.totalItems === ItemPriceInputString.DNC_STRING || other.totalItems === ItemPriceInputString.DNC_STRING || this.totalItems === other.totalItems);
  }

  static equalLists(a: ItemPriceInputString[], b: ItemPriceInputString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
