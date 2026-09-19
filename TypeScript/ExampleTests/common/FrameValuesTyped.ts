import { FrameValuesString } from "./FrameValuesString.js";
import * as _json from "./json.js";

export class FrameValuesTyped {
  frame: number;
  roll1: string;
  roll2: string;
  roll3: string;
  score: string;
  totalScore: string;

  constructor(frame: number, roll1: string, roll2: string, roll3: string, score: string, totalScore: string) {
    this.frame = frame;
    this.roll1 = roll1;
    this.roll2 = roll2;
    this.roll3 = roll3;
    this.score = score;
    this.totalScore = totalScore;
  }

  static fromStringObj(s: FrameValuesString): FrameValuesTyped {
    return new FrameValuesTyped(
      s.frame !== "" ? Number(s.frame) : 0,
      s.roll1,
      s.roll2,
      s.roll3,
      s.score,
      s.totalScore
    );
  }

  toStringObj(): FrameValuesString {
    return new FrameValuesString(
      String(this.frame),
      String(this.roll1),
      String(this.roll2),
      String(this.roll3),
      String(this.score),
      String(this.totalScore)
    );
  }

  static toStringList(list: FrameValuesTyped[]): FrameValuesString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: FrameValuesString[]): FrameValuesTyped[] {
    return list.map(s => FrameValuesTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      frame: this.frame,
      roll1: this.roll1,
      roll2: this.roll2,
      roll3: this.roll3,
      score: this.score,
      totalScore: this.totalScore,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): FrameValuesTyped {
    return new FrameValuesTyped(
      _json.asInt(_json.requireField(m, "frame"), "frame"),
      _json.asString(_json.requireField(m, "roll1"), "roll1"),
      _json.asString(_json.requireField(m, "roll2"), "roll2"),
      _json.asString(_json.requireField(m, "roll3"), "roll3"),
      _json.asString(_json.requireField(m, "score"), "score"),
      _json.asString(_json.requireField(m, "totalScore"), "totalScore")
    );
  }

  static fromJSON(text: string): FrameValuesTyped {
    return FrameValuesTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly FrameValuesTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): FrameValuesTyped[] {
    const raw = _json.asArray(_json.parse(text), "FrameValuesTyped") ?? [];
    return raw.map((e) => FrameValuesTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Frame=${this.frame}, Roll1=${this.roll1}, Roll2=${this.roll2}, Roll3=${this.roll3}, Score=${this.score}, TotalScore=${this.totalScore}`;
  }

  equals(other: FrameValuesTyped): boolean {
    return this.frame === other.frame
      && this.roll1 === other.roll1
      && this.roll2 === other.roll2
      && this.roll3 === other.roll3
      && this.score === other.score
      && this.totalScore === other.totalScore;
  }
}
