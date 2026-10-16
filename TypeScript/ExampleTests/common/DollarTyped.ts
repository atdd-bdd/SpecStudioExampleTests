import type { DollarString } from "./DollarString.js";
import { Dollar } from "../production/index.js";

/** Dollar as the glue uses it: the text read into the declared type. */
export class DollarTyped {
  static readonly DNC_STRING = "?DNC?";

  /** The cell as written. ?DNC? and an empty cell are kept as they came. */
  readonly text: string;
  private readonly value: Dollar | undefined;

  constructor(s: DollarString = "") {
    this.text = s ?? "";
    this.value = (this.text === "" || this.text === DollarTyped.DNC_STRING)
      ? undefined
      : new Dollar(this.text);
  }

  static fromStringObj(s: DollarString): DollarTyped {
    return new DollarTyped(s);
  }

  hasValue(): boolean { return this.value !== undefined; }

  /** The declared value. An empty cell and ?DNC? have none. */
  get(): Dollar { return this.value as Dollar; }

  toDollarString(): DollarString { return this.text; }

  static fromStringList(list: DollarString[]): DollarTyped[] {
    return list.map((s) => new DollarTyped(s));
  }

  static toStringList(list: DollarTyped[]): DollarString[] {
    return list.map((t) => t.text);
  }

  toString(): string { return this.text; }

  equals(other: DollarTyped): boolean {
    return this.text === DollarTyped.DNC_STRING
      || other.text === DollarTyped.DNC_STRING
      || this.text === other.text;
  }
}
