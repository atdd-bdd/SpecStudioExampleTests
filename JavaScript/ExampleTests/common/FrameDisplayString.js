import * as tokens from "./tokens.js";

export class FrameDisplayString {
  static DNC_STRING = "?DNC?";

  constructor(frame = "", mark1 = "", mark2 = "", mark3 = "", totalScore = "") {
    this.frame = frame;
    this.mark1 = mark1;
    this.mark2 = mark2;
    this.mark3 = mark3;
    this.totalScore = totalScore;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new FrameDisplayString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? "",
      v[4] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 5, "FrameDisplay");
    return new FrameDisplayString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      parts[4]
    );
  }

  toString() {
    return tokens.token(this.frame) + " " + tokens.token(this.mark1) + " " + tokens.token(this.mark2) + " " + tokens.token(this.mark3) + " " + tokens.token(this.totalScore);
  }

  equals(other) {
    if (!(other instanceof FrameDisplayString)) return false;
    return (this.frame === FrameDisplayString.DNC_STRING || other.frame === FrameDisplayString.DNC_STRING || this.frame === other.frame)
      && (this.mark1 === FrameDisplayString.DNC_STRING || other.mark1 === FrameDisplayString.DNC_STRING || this.mark1 === other.mark1)
      && (this.mark2 === FrameDisplayString.DNC_STRING || other.mark2 === FrameDisplayString.DNC_STRING || this.mark2 === other.mark2)
      && (this.mark3 === FrameDisplayString.DNC_STRING || other.mark3 === FrameDisplayString.DNC_STRING || this.mark3 === other.mark3)
      && (this.totalScore === FrameDisplayString.DNC_STRING || other.totalScore === FrameDisplayString.DNC_STRING || this.totalScore === other.totalScore);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
