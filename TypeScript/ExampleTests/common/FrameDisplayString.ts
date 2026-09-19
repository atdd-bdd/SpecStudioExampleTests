
import * as tokens from "./tokens.js";

export class FrameDisplayString {
  static readonly DNC_STRING = "?DNC?";

  frame: string;
  mark1: string;
  mark2: string;
  mark3: string;
  totalScore: string;

  constructor(frame: string = "", mark1: string = "", mark2: string = "", mark3: string = "", totalScore: string = "") {
    this.frame = frame;
    this.mark1 = mark1;
    this.mark2 = mark2;
    this.mark3 = mark3;
    this.totalScore = totalScore;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): FrameDisplayString {
    const parts = tokens.require_(text, 5, "FrameDisplay");
    return new FrameDisplayString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      parts[4]
    );
  }

  static fromList(values: Iterable<string>): FrameDisplayString {
    const v = Array.from(values);
    const r = new FrameDisplayString();
    r.frame = v[0] ?? "";
    r.mark1 = v[1] ?? "";
    r.mark2 = v[2] ?? "";
    r.mark3 = v[3] ?? "";
    r.totalScore = v[4] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.frame) + " " + tokens.token(this.mark1) + " " + tokens.token(this.mark2) + " " + tokens.token(this.mark3) + " " + tokens.token(this.totalScore);
  }

  equals(other: FrameDisplayString): boolean {
    return (this.frame === FrameDisplayString.DNC_STRING || other.frame === FrameDisplayString.DNC_STRING || this.frame === other.frame)
      && (this.mark1 === FrameDisplayString.DNC_STRING || other.mark1 === FrameDisplayString.DNC_STRING || this.mark1 === other.mark1)
      && (this.mark2 === FrameDisplayString.DNC_STRING || other.mark2 === FrameDisplayString.DNC_STRING || this.mark2 === other.mark2)
      && (this.mark3 === FrameDisplayString.DNC_STRING || other.mark3 === FrameDisplayString.DNC_STRING || this.mark3 === other.mark3)
      && (this.totalScore === FrameDisplayString.DNC_STRING || other.totalScore === FrameDisplayString.DNC_STRING || this.totalScore === other.totalScore);
  }

  static equalLists(a: FrameDisplayString[], b: FrameDisplayString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
