import * as tokens from "./tokens.js";

export class FrameValuesString {
  static DNC_STRING = "?DNC?";

  constructor(frame = "", roll1 = "", roll2 = "", roll3 = "", score = "", totalScore = "") {
    this.frame = frame;
    this.roll1 = roll1;
    this.roll2 = roll2;
    this.roll3 = roll3;
    this.score = score;
    this.totalScore = totalScore;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new FrameValuesString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? "",
      v[4] ?? "",
      v[5] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
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

  toString() {
    return tokens.token(this.frame) + " " + tokens.token(this.roll1) + " " + tokens.token(this.roll2) + " " + tokens.token(this.roll3) + " " + tokens.token(this.score) + " " + tokens.token(this.totalScore);
  }

  equals(other) {
    if (!(other instanceof FrameValuesString)) return false;
    return (this.frame === FrameValuesString.DNC_STRING || other.frame === FrameValuesString.DNC_STRING || this.frame === other.frame)
      && (this.roll1 === FrameValuesString.DNC_STRING || other.roll1 === FrameValuesString.DNC_STRING || this.roll1 === other.roll1)
      && (this.roll2 === FrameValuesString.DNC_STRING || other.roll2 === FrameValuesString.DNC_STRING || this.roll2 === other.roll2)
      && (this.roll3 === FrameValuesString.DNC_STRING || other.roll3 === FrameValuesString.DNC_STRING || this.roll3 === other.roll3)
      && (this.score === FrameValuesString.DNC_STRING || other.score === FrameValuesString.DNC_STRING || this.score === other.score)
      && (this.totalScore === FrameValuesString.DNC_STRING || other.totalScore === FrameValuesString.DNC_STRING || this.totalScore === other.totalScore);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
