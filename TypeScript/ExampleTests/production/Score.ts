/**
 * A frame score or running total, or -1 (TBS) while the rolls it depends on have not
 * all been made.
 *
 * The spec's ValidValues table bounds it at 0..300 -- 300 being a perfect game
 * -- and rejects 301; -1 is valid only because the spec defines TBS as -1:
 * a frame ending in a strike or a spare cannot be scored until its bonus rolls
 * exist, and "not yet computable" is a normal state rather than an error.
 */
export class Score {
  /** Marker for a score that cannot be computed yet: the integer the spec defines TBS as. */
  static readonly TBS_VALUE = -1;

  static readonly MIN = 0;
  static readonly MAX = 300;

  /** The value a frame not yet scorable carries. */
  static readonly TBS = new Score(Score.TBS_VALUE);

  readonly value: number;

  /** From the text form a table cell holds, or from a total. */
  constructor(value: string | number) {
    const text = String(value ?? "").trim();
    if (!/^[+-]?\d+$/.test(text))
      throw new Error(`Not a score: ${text}`);

    const points = Number(text);
    if (points !== Score.TBS_VALUE && (points < Score.MIN || points > Score.MAX))
      throw new Error(`Score must be between ${Score.MIN} and ${Score.MAX}, got ${points}`);
    this.value = points;
  }

  isComputable(): boolean {
    return this.value !== Score.TBS_VALUE;
  }

  /** Points, or -1 when not yet computable. */
  points(): number {
    return this.value;
  }

  /** The text form: what a table cell holds. */
  toString(): string {
    return String(this.value);
  }
}
