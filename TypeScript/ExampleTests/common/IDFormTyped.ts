import type { IDFormString } from "./IDFormString.js";
import { IDForm } from "../production/index.js";

/** IDForm as the glue uses it: the text read into the declared type. */
export class IDFormTyped {
  static readonly DNC_STRING = "?DNC?";

  /** The cell as written. ?DNC? and an empty cell are kept as they came. */
  readonly text: string;
  private readonly value: IDForm | undefined;

  constructor(s: IDFormString = "") {
    this.text = s ?? "";
    this.value = (this.text === "" || this.text === IDFormTyped.DNC_STRING)
      ? undefined
      : new IDForm(this.text);
  }

  static fromStringObj(s: IDFormString): IDFormTyped {
    return new IDFormTyped(s);
  }

  hasValue(): boolean { return this.value !== undefined; }

  /** The declared value. An empty cell and ?DNC? have none. */
  get(): IDForm { return this.value as IDForm; }

  toIDFormString(): IDFormString { return this.text; }

  static fromStringList(list: IDFormString[]): IDFormTyped[] {
    return list.map((s) => new IDFormTyped(s));
  }

  static toStringList(list: IDFormTyped[]): IDFormString[] {
    return list.map((t) => t.text);
  }

  toString(): string { return this.text; }

  equals(other: IDFormTyped): boolean {
    return this.text === IDFormTyped.DNC_STRING
      || other.text === IDFormTyped.DNC_STRING
      || this.text === other.text;
  }
}
