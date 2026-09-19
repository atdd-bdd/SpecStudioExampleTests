
import * as tokens from "./tokens.js";

export class FrameValuesString {
  static readonly DNC_STRING = "?DNC?";

  frame: string;
  roll1: string;
  roll2: string;
  roll3: string;
  score: string;
  totalScore: string;

  constructor(frame: string = "", roll1: string = "", roll2: string = "", roll3: string = "", score: string = "", totalScore: string = "") {
    this.frame = frame;
    this.roll1 = roll1;
    this.roll2 = roll2;
    this.roll3 = roll3;
    this.score = score;
    this.totalScore = totalScore;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): FrameValuesString {
    const parts = tokens.require_(text, 6, "FrameValues");
    return new FrameValuesString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      parts[4],
      parts[5]
    );
  }

  static fromList(values: Iterable<string>): FrameValuesString {
    const v = Array.from(values);
    const r = new FrameValuesString();
    r.frame = v[0] ?? "";
    r.roll1 = v[1] ?? "";
    r.roll2 = v[2] ?? "";
    r.roll3 = v[3] ?? "";
    r.score = v[4] ?? "";
    r.totalScore = v[5] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.frame) + " " + tokens.token(this.roll1) + " " + tokens.token(this.roll2) + " " + tokens.token(this.roll3) + " " + tokens.token(this.score) + " " + tokens.token(this.totalScore);
  }

  equals(other: FrameValuesString): boolean {
    return (this.frame === FrameValuesString.DNC_STRING || other.frame === FrameValuesString.DNC_STRING || this.frame === other.frame)
      && (this.roll1 === FrameValuesString.DNC_STRING || other.roll1 === FrameValuesString.DNC_STRING || this.roll1 === other.roll1)
      && (this.roll2 === FrameValuesString.DNC_STRING || other.roll2 === FrameValuesString.DNC_STRING || this.roll2 === other.roll2)
      && (this.roll3 === FrameValuesString.DNC_STRING || other.roll3 === FrameValuesString.DNC_STRING || this.roll3 === other.roll3)
      && (this.score === FrameValuesString.DNC_STRING || other.score === FrameValuesString.DNC_STRING || this.score === other.score)
      && (this.totalScore === FrameValuesString.DNC_STRING || other.totalScore === FrameValuesString.DNC_STRING || this.totalScore === other.totalScore);
  }

  static equalLists(a: FrameValuesString[], b: FrameValuesString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
