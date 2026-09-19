
import * as tokens from "./tokens.js";

export class ReplacePostString {
  static readonly DNC_STRING = "?DNC?";

  id: string;
  userId: string;
  title: string;
  body: string;

  constructor(id: string = "", userId: string = "", title: string = "", body: string = "") {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): ReplacePostString {
    const parts = tokens.require_(text, 4, "ReplacePost");
    return new ReplacePostString(
      parts[0],
      parts[1],
      parts[2],
      parts[3]
    );
  }

  static fromList(values: Iterable<string>): ReplacePostString {
    const v = Array.from(values);
    const r = new ReplacePostString();
    r.id = v[0] ?? "";
    r.userId = v[1] ?? "";
    r.title = v[2] ?? "";
    r.body = v[3] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.id) + " " + tokens.token(this.userId) + " " + tokens.token(this.title) + " " + tokens.token(this.body);
  }

  equals(other: ReplacePostString): boolean {
    return (this.id === ReplacePostString.DNC_STRING || other.id === ReplacePostString.DNC_STRING || this.id === other.id)
      && (this.userId === ReplacePostString.DNC_STRING || other.userId === ReplacePostString.DNC_STRING || this.userId === other.userId)
      && (this.title === ReplacePostString.DNC_STRING || other.title === ReplacePostString.DNC_STRING || this.title === other.title)
      && (this.body === ReplacePostString.DNC_STRING || other.body === ReplacePostString.DNC_STRING || this.body === other.body);
  }

  static equalLists(a: ReplacePostString[], b: ReplacePostString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
