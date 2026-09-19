import { Pins } from "./Pins.js";
import { Score } from "./Score.js";

const FRAMES = 10;

/**
 * One frame's rolls as the scoresheet shows them, plus its score.
 *
 * roll1..roll3 are the three rolls starting at this frame's first roll -- not
 * only the rolls bowled in this frame. After a strike, roll2 and roll3 are the
 * next frame's rolls, because those are what score this one. The spec's
 * FrameValues table is written that way: frame 4 is a strike and still lists
 * Roll2 and Roll3 as the two rolls that follow it.
 */
export class Frame {
  constructor(
    readonly number: number,
    readonly roll1: Pins,
    readonly roll2: Pins,
    readonly roll3: Pins,
    readonly score: Score,
    readonly totalScore: Score,
  ) {}

  isStrike(): boolean {
    return this.roll1.isStrike();
  }

  /** A spare only counts when it is not already a strike. */
  isSpare(): boolean {
    return !this.isStrike() && this.roll1.isRolled() && this.roll2.isRolled()
      && this.roll1.count() + this.roll2.count() === Pins.MAX;
  }
}

/**
 * How one frame is written on a scoresheet: X for a strike, / for a spare,
 * - for a gutter ball, blank for a roll not yet made.
 *
 * mark3 is only ever filled on the tenth frame, the only frame that can have a
 * third roll of its own.
 */
export class FrameMarks {
  constructor(
    readonly frame: string,
    readonly mark1: string,
    readonly mark2: string,
    readonly mark3: string,
    readonly totalScore: string,
  ) {}

  /** The mark columns joined, as they appear in the top row of the display. */
  marks(): string {
    return this.mark1 + this.mark2 + this.mark3;
  }
}

/**
 * Where the next roll goes, and how many pins are standing for it -- what a
 * keypad needs in order to disable the buttons that cannot be pressed.
 */
export class InputControl {
  constructor(
    readonly frame: number,
    readonly roll: number,
    readonly remaining: number,
  ) {}
}

/**
 * A game of ten-pin bowling: the rolls made so far, the scoresheet they produce,
 * and what the next roll is allowed to be.
 *
 * All the scoring lives here rather than in the test glue. The glue's job is to
 * hand rolls in and read values out.
 */
export class BowlingGame {
  private rollsMade: number[] = [];

  // True when the game was seeded with the tenth frame's rolls alone, so the
  // tenth frame can be examined without bowling the nine before it. The earlier
  // frames then have no rolls, which is why their scores -- and every running
  // total -- stay TBS.
  private tenthFrameOnly = false;

  rolls(): number[] {
    return [...this.rollsMade];
  }

  /** Replaces the rolls outright. Setup, not play -- no validation. */
  setRolls(pinCounts: readonly number[]): void {
    this.rollsMade = [...pinCounts];
    this.tenthFrameOnly = false;
  }

  /** Seeds only the tenth frame; frames 1..9 are left unbowled. */
  setTenthFrameRolls(pinCounts: readonly number[]): void {
    this.rollsMade = [...pinCounts];
    this.tenthFrameOnly = true;
  }

  /**
   * Bowls one roll. Returns false and changes nothing when the roll is
   * impossible -- more pins than are standing, or a game already over.
   */
  addRoll(pinCount: number): boolean {
    if (pinCount < 0 || pinCount > Pins.MAX) return false;
    if (this.isComplete()) return false;
    if (pinCount > this.inputControl().remaining) return false;

    this.rollsMade.push(pinCount);
    return true;
  }

  /**
   * Recomputes the scoresheet. Scoring is derived on demand, so this exists to
   * give the specification's "When scored" step something real to drive.
   */
  score(): void {
    this.frames();
  }

  // ---- scoresheet ------------------------------------------------------

  frames(): Frame[] {
    const result: Frame[] = [];
    const starts = this.frameStarts();
    let running = 0;
    let runningKnown = true;

    for (let f = 1; f <= FRAMES; ++f) {
      const start = starts[f];
      const roll1 = this.pinsAt(start);
      const roll2 = this.pinsAt(start + 1);
      const roll3 = this.pinsAt(start + 2);

      const strike = roll1.isStrike();
      const spare = !strike && roll1.isRolled() && roll2.isRolled()
        && roll1.count() + roll2.count() === Pins.MAX;

      // A strike or a spare is only worth what the following rolls make it, so
      // it needs three rolls before it can be scored at all.
      const needed = (strike || spare) ? 3 : 2;

      let score = Score.TBS;
      let total = Score.TBS;
      if (this.allRolled(start, needed)) {
        const points = roll1.count() + roll2.count() + (needed === 3 ? roll3.count() : 0);
        score = new Score(points);
        if (runningKnown) {
          running += points;
          total = new Score(running);
        }
      } else {
        // Once one frame cannot be scored, no later total can be either.
        runningKnown = false;
      }

      result.push(new Frame(f, roll1, roll2, roll3, score, total));
    }
    return result;
  }

  marks(): FrameMarks[] {
    const result: FrameMarks[] = [];

    for (const frame of this.frames()) {
      let mark1 = "";
      let mark2 = "";
      let mark3 = "";

      if (frame.roll1.isRolled())
        mark1 = frame.roll1.isStrike() ? "X" : BowlingGame.digit(frame.roll1);

      if (frame.number < FRAMES) {
        // Frames 1..9 show only their own two rolls; after a strike there is no
        // second mark, even though roll2 holds the next frame's roll.
        if (!frame.roll1.isStrike() && frame.roll1.isRolled() && frame.roll2.isRolled())
          mark2 = frame.roll1.count() + frame.roll2.count() === Pins.MAX
            ? "/" : BowlingGame.digit(frame.roll2);
      } else {
        if (frame.roll2.isRolled()) {
          if (frame.roll1.isStrike())
            mark2 = frame.roll2.isStrike() ? "X" : BowlingGame.digit(frame.roll2);
          else
            mark2 = frame.roll1.count() + frame.roll2.count() === Pins.MAX
              ? "/" : BowlingGame.digit(frame.roll2);
        }
        if (frame.roll3.isRolled()) {
          const spareOnBonus = frame.roll1.isStrike() && !frame.roll2.isStrike()
            && frame.roll2.count() + frame.roll3.count() === Pins.MAX;
          mark3 = spareOnBonus ? "/"
            : frame.roll3.isStrike() ? "X" : BowlingGame.digit(frame.roll3);
        }
      }

      const total = frame.totalScore.isComputable() ? frame.totalScore.toString() : "";
      result.push(new FrameMarks(String(frame.number), mark1, mark2, mark3, total));
    }
    return result;
  }

  /**
   * The scoresheet as two rows: marks above, running totals below.
   *
   * Each frame's column is as wide as the wider of its two cells, so a frame
   * whose total reaches three digits widens both rows together and the columns
   * stay aligned under each other.
   *
   * Two rows, no trailing newline: that is what the docstring in the
   * specification holds, and it is compared as text.
   */
  display(): string {
    let top = "";
    let bottom = "";

    for (const frame of this.marks()) {
      const width = Math.max(frame.marks().length, frame.totalScore.length);
      top += "| " + frame.marks().padEnd(width) + " ";
      bottom += "| " + frame.totalScore.padEnd(width) + " ";
    }
    return top + "|\n" + bottom + "|";
  }

  // ---- state -----------------------------------------------------------

  /** True once the tenth frame has had every roll it is entitled to. */
  isComplete(): boolean {
    const start = this.frameStarts()[FRAMES];
    const roll1 = this.pinsAt(start);
    const roll2 = this.pinsAt(start + 1);
    if (!roll1.isRolled() || !roll2.isRolled()) return false;

    const strike = roll1.isStrike();
    const spare = !strike && roll1.count() + roll2.count() === Pins.MAX;
    return (strike || spare) ? this.pinsAt(start + 2).isRolled() : true;
  }

  /** Which frame and roll the next ball belongs to, and how many pins stand. */
  inputControl(): InputControl {
    const starts = this.frameStarts();

    for (let f = 1; f < FRAMES; ++f) {
      const start = starts[f];
      const roll1 = this.pinsAt(start);
      if (!roll1.isRolled()) return new InputControl(f, 1, Pins.MAX);
      if (roll1.isStrike()) continue;          // one roll ends the frame
      if (!this.pinsAt(start + 1).isRolled())
        return new InputControl(f, 2, Pins.MAX - roll1.count());
    }

    const start = starts[FRAMES];
    const roll1 = this.pinsAt(start);
    const roll2 = this.pinsAt(start + 1);
    if (!roll1.isRolled()) return new InputControl(FRAMES, 1, Pins.MAX);
    if (!roll2.isRolled())
      return new InputControl(FRAMES, 2,
        roll1.isStrike() ? Pins.MAX : Pins.MAX - roll1.count());

    // Third roll of the tenth. After two strikes the rack is full again; after a
    // strike then a non-strike, only what that ball left standing; after a
    // spare, a fresh rack.
    const remaining = (roll1.isStrike() && !roll2.isStrike())
      ? Pins.MAX - roll2.count() : Pins.MAX;
    return new InputControl(FRAMES, 3, remaining);
  }

  // ---- helpers ---------------------------------------------------------

  /**
   * Index of each frame's first roll. A strike ends a frame in one roll, so the
   * next frame starts one later rather than two.
   */
  private frameStarts(): number[] {
    const starts = new Array<number>(FRAMES + 1).fill(0);

    if (this.tenthFrameOnly) {
      // Frames 1..9 are unbowled: point them past every roll so each one reads
      // back as TBR.
      for (let f = 1; f < FRAMES; ++f) starts[f] = this.rollsMade.length + FRAMES * 2;
      starts[FRAMES] = 0;
      return starts;
    }

    let index = 0;
    for (let f = 1; f < FRAMES; ++f) {
      starts[f] = index;
      index += (index < this.rollsMade.length && this.rollsMade[index] === Pins.MAX) ? 1 : 2;
    }
    starts[FRAMES] = index;
    return starts;
  }

  private pinsAt(index: number): Pins {
    if (index < 0 || index >= this.rollsMade.length) return Pins.TBR;
    return new Pins(this.rollsMade[index]);
  }

  private allRolled(start: number, count: number): boolean {
    for (let i = 0; i < count; ++i)
      if (!this.pinsAt(start + i).isRolled()) return false;
    return true;
  }

  /** A gutter ball is written as a dash, not a zero. */
  private static digit(pins: Pins): string {
    return pins.count() === 0 ? "-" : String(pins.count());
  }
}
