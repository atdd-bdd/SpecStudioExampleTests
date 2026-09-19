import * as tokens from "./tokens.js";

export class ReplacePostString {
  static DNC_STRING = "?DNC?";

  constructor(id = "", userId = "", title = "", body = "") {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ReplacePostString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 4, "ReplacePost");
    return new ReplacePostString(
      parts[0],
      parts[1],
      parts[2],
      parts[3]
    );
  }

  toString() {
    return tokens.token(this.id) + " " + tokens.token(this.userId) + " " + tokens.token(this.title) + " " + tokens.token(this.body);
  }

  equals(other) {
    if (!(other instanceof ReplacePostString)) return false;
    return (this.id === ReplacePostString.DNC_STRING || other.id === ReplacePostString.DNC_STRING || this.id === other.id)
      && (this.userId === ReplacePostString.DNC_STRING || other.userId === ReplacePostString.DNC_STRING || this.userId === other.userId)
      && (this.title === ReplacePostString.DNC_STRING || other.title === ReplacePostString.DNC_STRING || this.title === other.title)
      && (this.body === ReplacePostString.DNC_STRING || other.body === ReplacePostString.DNC_STRING || this.body === other.body);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
