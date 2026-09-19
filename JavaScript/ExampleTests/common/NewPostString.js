import * as tokens from "./tokens.js";

export class NewPostString {
  static DNC_STRING = "?DNC?";

  constructor(title = "", body = "", userId = "") {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new NewPostString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 3, "NewPost");
    return new NewPostString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  toString() {
    return tokens.token(this.title) + " " + tokens.token(this.body) + " " + tokens.token(this.userId);
  }

  equals(other) {
    if (!(other instanceof NewPostString)) return false;
    return (this.title === NewPostString.DNC_STRING || other.title === NewPostString.DNC_STRING || this.title === other.title)
      && (this.body === NewPostString.DNC_STRING || other.body === NewPostString.DNC_STRING || this.body === other.body)
      && (this.userId === NewPostString.DNC_STRING || other.userId === NewPostString.DNC_STRING || this.userId === other.userId);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
