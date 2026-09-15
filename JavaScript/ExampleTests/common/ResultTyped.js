import { ResultString } from "./ResultString.js";
import * as _json from "./json.js";
import { MatchTyped } from "./MatchTyped.js";

export class ResultTyped {
  constructor(addressMatches = []) {
    this.addressMatches = addressMatches;
  }

  static fromStringObj(s) {
    return new ResultTyped(
      []
    );
  }

  toStringObj() {
    return new ResultString(
      ""
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => ResultTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      addressMatches: this.addressMatches.map((e) => e.toJsonValue()),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ResultTyped(
      (_json.asArray(_json.require(m, "addressMatches"), "addressMatches") ?? []).map((e) => MatchTyped.fromJsonValue(e))
    );
  }

  static fromJSON(text) { return ResultTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ResultTyped");
    return raw.map((e) => ResultTyped.fromJsonValue(e));
  }

  toString() {
    return `addressMatches=${this.addressMatches}`;
  }

  equals(other) {
    if (!(other instanceof ResultTyped)) return false;
    return this.addressMatches === other.addressMatches;
  }
}
