import type { SimpleTextString } from "./SimpleTextString.js";
import { SimpleText } from "../production/index.js";

/** SimpleText as the glue uses it: the text read into the declared type. */
export class SimpleTextTyped {
  static readonly DNC_STRING = "?DNC?";

  /** The cell as written. ?DNC? and an empty cell are kept as they came. */
  readonly text: string;
  private readonly value: SimpleText | undefined;

  constructor(s: SimpleTextString = "") {
    this.text = s ?? "";
    this.value = (this.text === "" || this.text === SimpleTextTyped.DNC_STRING)
      ? undefined
      : new SimpleText(this.text);
  }

  static fromStringObj(s: SimpleTextString): SimpleTextTyped {
    return new SimpleTextTyped(s);
  }

  hasValue(): boolean { return this.value !== undefined; }

  /** The declared value. An empty cell and ?DNC? have none. */
  get(): SimpleText { return this.value as SimpleText; }

  toSimpleTextString(): SimpleTextString { return this.text; }

  static fromStringList(list: SimpleTextString[]): SimpleTextTyped[] {
    return list.map((s) => new SimpleTextTyped(s));
  }

  static toStringList(list: SimpleTextTyped[]): SimpleTextString[] {
    return list.map((t) => t.text);
  }

  toString(): string { return this.text; }

  equals(other: SimpleTextTyped): boolean {
    return this.text === SimpleTextTyped.DNC_STRING
      || other.text === SimpleTextTyped.DNC_STRING
      || this.text === other.text;
  }
}
