import { FrameDisplayString } from "./FrameDisplayString.js";
import * as _json from "./json.js";

export class FrameDisplayTyped {
  constructor(frame = "", mark1 = "", mark2 = "", mark3 = "", totalScore = "") {
    this.frame = frame;
    this.mark1 = mark1;
    this.mark2 = mark2;
    this.mark3 = mark3;
    this.totalScore = totalScore;
  }

  static fromStringObj(s) {
    return new FrameDisplayTyped(
      s.frame,
      s.mark1,
      s.mark2,
      s.mark3,
      s.totalScore
    );
  }

  toStringObj() {
    return new FrameDisplayString(
      String(this.frame),
      String(this.mark1),
      String(this.mark2),
      String(this.mark3),
      String(this.totalScore)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => FrameDisplayTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      frame: this.frame,
      mark1: this.mark1,
      mark2: this.mark2,
      mark3: this.mark3,
      totalScore: this.totalScore,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new FrameDisplayTyped(
      _json.asString(_json.require(m, "frame"), "frame"),
      _json.asString(_json.require(m, "mark1"), "mark1"),
      _json.asString(_json.require(m, "mark2"), "mark2"),
      _json.asString(_json.require(m, "mark3"), "mark3"),
      _json.asString(_json.require(m, "totalScore"), "totalScore")
    );
  }

  static fromJSON(text) { return FrameDisplayTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "FrameDisplayTyped");
    return raw.map((e) => FrameDisplayTyped.fromJsonValue(e));
  }

  toString() {
    return `Frame=${this.frame}, Mark1=${this.mark1}, Mark2=${this.mark2}, Mark3=${this.mark3}, TotalScore=${this.totalScore}`;
  }

  equals(other) {
    if (!(other instanceof FrameDisplayTyped)) return false;
    return this.frame === other.frame
      && this.mark1 === other.mark1
      && this.mark2 === other.mark2
      && this.mark3 === other.mark3
      && this.totalScore === other.totalScore;
  }
}
