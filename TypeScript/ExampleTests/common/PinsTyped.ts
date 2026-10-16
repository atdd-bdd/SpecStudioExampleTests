import type { PinsString } from "./PinsString.js";
import { Pins } from "../production/index.js";

/** Pins as the glue uses it: the text read into the declared type. */
export class PinsTyped {
  static readonly DNC_STRING = "?DNC?";

  /** The cell as written. ?DNC? and an empty cell are kept as they came. */
  readonly text: string;
  private readonly value: Pins | undefined;

  constructor(s: PinsString = "") {
    this.text = s ?? "";
    this.value = (this.text === "" || this.text === PinsTyped.DNC_STRING)
      ? undefined
      : new Pins(this.text);
  }

  static fromStringObj(s: PinsString): PinsTyped {
    return new PinsTyped(s);
  }

  hasValue(): boolean { return this.value !== undefined; }

  /** The declared value. An empty cell and ?DNC? have none. */
  get(): Pins { return this.value as Pins; }

  toPinsString(): PinsString { return this.text; }

  static fromStringList(list: PinsString[]): PinsTyped[] {
    return list.map((s) => new PinsTyped(s));
  }

  static toStringList(list: PinsTyped[]): PinsString[] {
    return list.map((t) => t.text);
  }

  toString(): string { return this.text; }

  equals(other: PinsTyped): boolean {
    return this.text === PinsTyped.DNC_STRING
      || other.text === PinsTyped.DNC_STRING
      || this.text === other.text;
  }
}
