import * as tokens from "./tokens.js";

export class PostString {
  static DNC_STRING = "?DNC?";

  constructor(userId = "", id = "", title = "", body = "") {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new PostString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 4, "Post");
    return new PostString(
      parts[0],
      parts[1],
      parts[2],
      parts[3]
    );
  }

  toString() {
    return tokens.token(this.userId) + " " + tokens.token(this.id) + " " + tokens.token(this.title) + " " + tokens.token(this.body);
  }

  equals(other) {
    if (!(other instanceof PostString)) return false;
    return (this.userId === PostString.DNC_STRING || other.userId === PostString.DNC_STRING || this.userId === other.userId)
      && (this.id === PostString.DNC_STRING || other.id === PostString.DNC_STRING || this.id === other.id)
      && (this.title === PostString.DNC_STRING || other.title === PostString.DNC_STRING || this.title === other.title)
      && (this.body === PostString.DNC_STRING || other.body === PostString.DNC_STRING || this.body === other.body);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
