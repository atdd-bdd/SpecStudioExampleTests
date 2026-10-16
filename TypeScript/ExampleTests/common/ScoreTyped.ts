import type { ScoreString } from "./ScoreString.js";
import { Score } from "../production/index.js";

/** Score as the glue uses it: the text read into the declared type. */
export class ScoreTyped {
  static readonly DNC_STRING = "?DNC?";

  /** The cell as written. ?DNC? and an empty cell are kept as they came. */
  readonly text: string;
  private readonly value: Score | undefined;

  constructor(s: ScoreString = "") {
    this.text = s ?? "";
    this.value = (this.text === "" || this.text === ScoreTyped.DNC_STRING)
      ? undefined
      : new Score(this.text);
  }

  static fromStringObj(s: ScoreString): ScoreTyped {
    return new ScoreTyped(s);
  }

  hasValue(): boolean { return this.value !== undefined; }

  /** The declared value. An empty cell and ?DNC? have none. */
  get(): Score { return this.value as Score; }

  toScoreString(): ScoreString { return this.text; }

  static fromStringList(list: ScoreString[]): ScoreTyped[] {
    return list.map((s) => new ScoreTyped(s));
  }

  static toStringList(list: ScoreTyped[]): ScoreString[] {
    return list.map((t) => t.text);
  }

  toString(): string { return this.text; }

  equals(other: ScoreTyped): boolean {
    return this.text === ScoreTyped.DNC_STRING
      || other.text === ScoreTyped.DNC_STRING
      || this.text === other.text;
  }
}
