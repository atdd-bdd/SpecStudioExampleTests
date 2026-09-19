
import * as tokens from "./tokens.js";

export class PostString {
  static readonly DNC_STRING = "?DNC?";

  userId: string;
  id: string;
  title: string;
  body: string;

  constructor(userId: string = "", id: string = "", title: string = "", body: string = "") {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): PostString {
    const parts = tokens.require_(text, 4, "Post");
    return new PostString(
      parts[0],
      parts[1],
      parts[2],
      parts[3]
    );
  }

  static fromList(values: Iterable<string>): PostString {
    const v = Array.from(values);
    const r = new PostString();
    r.userId = v[0] ?? "";
    r.id = v[1] ?? "";
    r.title = v[2] ?? "";
    r.body = v[3] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.userId) + " " + tokens.token(this.id) + " " + tokens.token(this.title) + " " + tokens.token(this.body);
  }

  equals(other: PostString): boolean {
    return (this.userId === PostString.DNC_STRING || other.userId === PostString.DNC_STRING || this.userId === other.userId)
      && (this.id === PostString.DNC_STRING || other.id === PostString.DNC_STRING || this.id === other.id)
      && (this.title === PostString.DNC_STRING || other.title === PostString.DNC_STRING || this.title === other.title)
      && (this.body === PostString.DNC_STRING || other.body === PostString.DNC_STRING || this.body === other.body);
  }

  static equalLists(a: PostString[], b: PostString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
