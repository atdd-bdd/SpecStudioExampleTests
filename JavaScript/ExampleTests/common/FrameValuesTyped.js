import { FrameValuesString } from "./FrameValuesString.js";
import * as _json from "./json.js";

export class FrameValuesTyped {
  constructor(frame = 0, roll1 = "", roll2 = "", roll3 = "", score = "", totalScore = "") {
    this.frame = frame;
    this.roll1 = roll1;
    this.roll2 = roll2;
    this.roll3 = roll3;
    this.score = score;
    this.totalScore = totalScore;
  }

  static fromStringObj(s) {
    return new FrameValuesTyped(
      s.frame !== "" ? Number(s.frame) : 0,
      s.roll1,
      s.roll2,
      s.roll3,
      s.score,
      s.totalScore
    );
  }

  toStringObj() {
    return new FrameValuesString(
      String(this.frame),
      String(this.roll1),
      String(this.roll2),
      String(this.roll3),
      String(this.score),
      String(this.totalScore)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => FrameValuesTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      frame: this.frame,
      roll1: this.roll1 == null ? null : String(this.roll1),
      roll2: this.roll2 == null ? null : String(this.roll2),
      roll3: this.roll3 == null ? null : String(this.roll3),
      score: this.score == null ? null : String(this.score),
      totalScore: this.totalScore == null ? null : String(this.totalScore),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new FrameValuesTyped(
      _json.asInt(_json.require(m, "frame"), "frame"),
      new Pins(_json.asString(_json.require(m, "roll1"), "roll1")),
      new Pins(_json.asString(_json.require(m, "roll2"), "roll2")),
      new Pins(_json.asString(_json.require(m, "roll3"), "roll3")),
      new Score(_json.asString(_json.require(m, "score"), "score")),
      new Score(_json.asString(_json.require(m, "totalScore"), "totalScore"))
    );
  }

  static fromJSON(text) { return FrameValuesTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "FrameValuesTyped");
    return raw.map((e) => FrameValuesTyped.fromJsonValue(e));
  }

  toString() {
    return `Frame=${this.frame}, Roll1=${this.roll1}, Roll2=${this.roll2}, Roll3=${this.roll3}, Score=${this.score}, TotalScore=${this.totalScore}`;
  }

  equals(other) {
    if (!(other instanceof FrameValuesTyped)) return false;
    return this.frame === other.frame
      && this.roll1 === other.roll1
      && this.roll2 === other.roll2
      && this.roll3 === other.roll3
      && this.score === other.score
      && this.totalScore === other.totalScore;
  }
}
