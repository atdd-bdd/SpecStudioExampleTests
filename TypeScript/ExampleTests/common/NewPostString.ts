
import * as tokens from "./tokens.js";

export class NewPostString {
  static readonly DNC_STRING = "?DNC?";

  title: string;
  body: string;
  userId: string;

  constructor(title: string = "", body: string = "", userId: string = "") {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): NewPostString {
    const parts = tokens.require_(text, 3, "NewPost");
    return new NewPostString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  static fromList(values: Iterable<string>): NewPostString {
    const v = Array.from(values);
    const r = new NewPostString();
    r.title = v[0] ?? "";
    r.body = v[1] ?? "";
    r.userId = v[2] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.title) + " " + tokens.token(this.body) + " " + tokens.token(this.userId);
  }

  equals(other: NewPostString): boolean {
    return (this.title === NewPostString.DNC_STRING || other.title === NewPostString.DNC_STRING || this.title === other.title)
      && (this.body === NewPostString.DNC_STRING || other.body === NewPostString.DNC_STRING || this.body === other.body)
      && (this.userId === NewPostString.DNC_STRING || other.userId === NewPostString.DNC_STRING || this.userId === other.userId);
  }

  static equalLists(a: NewPostString[], b: NewPostString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
