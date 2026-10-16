import { FrameValuesString } from "./FrameValuesString.js";
import * as _json from "./json.js";
import { PinsTyped } from "./PinsTyped.js";
import { ScoreTyped } from "./ScoreTyped.js";

export class FrameValuesTyped {
  frame: number;
  roll1: PinsTyped;
  roll2: PinsTyped;
  roll3: PinsTyped;
  score: ScoreTyped;
  totalScore: ScoreTyped;

  constructor(frame: number, roll1: PinsTyped, roll2: PinsTyped, roll3: PinsTyped, score: ScoreTyped, totalScore: ScoreTyped) {
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
      new PinsTyped(s.roll1),
      new PinsTyped(s.roll2),
      new PinsTyped(s.roll3),
      new ScoreTyped(s.score),
      new ScoreTyped(s.totalScore)
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
      roll1: String(this.roll1),
      roll2: String(this.roll2),
      roll3: String(this.roll3),
      score: String(this.score),
      totalScore: String(this.totalScore),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): FrameValuesTyped {
    return new FrameValuesTyped(
      _json.asInt(_json.requireField(m, "frame"), "frame"),
      new PinsTyped(_json.asString(_json.requireField(m, "roll1"), "roll1")),
      new PinsTyped(_json.asString(_json.requireField(m, "roll2"), "roll2")),
      new PinsTyped(_json.asString(_json.requireField(m, "roll3"), "roll3")),
      new ScoreTyped(_json.asString(_json.requireField(m, "score"), "score")),
      new ScoreTyped(_json.asString(_json.requireField(m, "totalScore"), "totalScore"))
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
      && this.roll1.equals(other.roll1)
      && this.roll2.equals(other.roll2)
      && this.roll3.equals(other.roll3)
      && this.score.equals(other.score)
      && this.totalScore.equals(other.totalScore);
  }
}
