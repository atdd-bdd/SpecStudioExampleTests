import type { PercentageString } from "./PercentageString.js";
import { Percentage } from "../production/index.js";

/** Percentage as the glue uses it: the text read into the declared type. */
export class PercentageTyped {
  static readonly DNC_STRING = "?DNC?";

  /** The cell as written. ?DNC? and an empty cell are kept as they came. */
  readonly text: string;
  private readonly value: Percentage | undefined;

  constructor(s: PercentageString = "") {
    this.text = s ?? "";
    this.value = (this.text === "" || this.text === PercentageTyped.DNC_STRING)
      ? undefined
      : new Percentage(this.text);
  }

  static fromStringObj(s: PercentageString): PercentageTyped {
    return new PercentageTyped(s);
  }

  hasValue(): boolean { return this.value !== undefined; }

  /** The declared value. An empty cell and ?DNC? have none. */
  get(): Percentage { return this.value as Percentage; }

  toPercentageString(): PercentageString { return this.text; }

  static fromStringList(list: PercentageString[]): PercentageTyped[] {
    return list.map((s) => new PercentageTyped(s));
  }

  static toStringList(list: PercentageTyped[]): PercentageString[] {
    return list.map((t) => t.text);
  }

  toString(): string { return this.text; }

  equals(other: PercentageTyped): boolean {
    return this.text === PercentageTyped.DNC_STRING
      || other.text === PercentageTyped.DNC_STRING
      || this.text === other.text;
  }
}
