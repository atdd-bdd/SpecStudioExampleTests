import { BowlingGame, Pins, Score } from "./production/index.js";

const DNC_STRING = "?DNC?";

/**
 * Drives BowlingGame from the specification's steps.
 *
 * There is no scoring here on purpose: every rule about strikes, spares, marks
 * and totals lives in the production classes, and this file only hands rolls in
 * and compares what comes back.
 */
export class BowlingGlue {
  static DNC_STRING = DNC_STRING;

  #game = new BowlingGame();

  // ---- given -----------------------------------------------------------

  givenRollsAre(values) {
    this.#game.setRolls(BowlingGlue.#pinCounts(values));
  }

  givenRollsForTenthFrameAre(values) {
    this.#game.setTenthFrameRolls(BowlingGlue.#pinCounts(values));
  }

  /** The frame values from the previous step are still on the same game. */
  givenFrameValuesAreAsPrevious() {
    expect(this.#game.frames().length).toBeGreaterThan(0);
  }

  // ---- when ------------------------------------------------------------

  whenRollIs(values) {
    for (const pinCount of BowlingGlue.#pinCounts(values))
      this.#game.addRoll(pinCount);
  }

  whenScored() {
    this.#game.score();
  }

  // ---- then ------------------------------------------------------------

  thenRollsBecome(values) {
    expect(this.#game.rolls()).toEqual(BowlingGlue.#pinCounts(values));
  }

  thenDisplayIs(value) {
    expect(this.#game.display()).toBe(value);
  }

  thenFrameValuesAre(values) {
    for (const expected of values) this.#assertFrameEquals(expected);
  }

  /**
   * The step reads "Then Then tenth frame values are" in the specification, and
   * the generated method name follows it. Renaming the method would only make it
   * disagree with the generated test.
   */
  thenThenTenthFrameValuesAre(values) {
    for (const expected of values) this.#assertFrameEquals(expected);
  }

  thenDisplayValuesAre(values) {
    const actual = this.#game.marks();

    for (const expected of values) {
      const frame = actual.find((f) => f.frame === expected.frame.trim());
      expect(`frame ${expected.frame} found: ${frame !== undefined}`)
        .toBe(`frame ${expected.frame} found: true`);

      const where = `frame ${expected.frame} `;
      BowlingGlue.#assertField(where + "Mark1", expected.mark1, frame.mark1);
      BowlingGlue.#assertField(where + "Mark2", expected.mark2, frame.mark2);
      BowlingGlue.#assertField(where + "Mark3", expected.mark3, frame.mark3);
      BowlingGlue.#assertField(where + "TotalScore", expected.totalScore, frame.totalScore);
    }
  }

  thenGameCompleteIs(values) {
    for (const row of values)
      for (const expected of row)
        expect(String(this.#game.isComplete())).toBe(expected.trim());
  }

  thenInputControlIs(values) {
    for (const expected of values) {
      const actual = this.#game.inputControl();
      BowlingGlue.#assertField("input control Frame", expected.frame, String(actual.frame));
      BowlingGlue.#assertField("input control Roll", expected.roll, String(actual.roll));
      BowlingGlue.#assertField("input control Remaining", expected.remaining,
                               String(actual.remaining));
    }
  }

  // ---- DataType checks -------------------------------------------------

  examplesDataTypePins(values) {
    for (const value of values) {
      let error = false;
      try { new Pins(value.value); } catch { error = true; }

      expect(`${value.value} ${!error}`)
        .toBe(`${value.value} ${BowlingGlue.#isTrue(value.isValid)}`);
    }
  }

  examplesDataTypeScore(values) {
    for (const value of values) {
      let error = false;
      try { new Score(value.value); } catch { error = true; }

      expect(`${value.value} ${!error}`)
        .toBe(`${value.value} ${BowlingGlue.#isTrue(value.isValid)}`);
    }
  }

  // ---- helpers ---------------------------------------------------------

  /** Flattens the step's table into the pin counts it lists, in order. */
  static #pinCounts(values) {
    const result = [];
    for (const row of values)
      for (const cell of row)
        if (cell.trim() !== "") result.push(Number(cell.trim()));
    return result;
  }

  #assertFrameEquals(expected) {
    const frame = this.#game.frames().find((f) => String(f.number) === expected.frame.trim());
    expect(`frame ${expected.frame} found: ${frame !== undefined}`)
      .toBe(`frame ${expected.frame} found: true`);

    const where = `frame ${expected.frame} `;
    BowlingGlue.#assertField(where + "Roll1", expected.roll1, frame.roll1.toString());
    BowlingGlue.#assertField(where + "Roll2", expected.roll2, frame.roll2.toString());
    BowlingGlue.#assertField(where + "Roll3", expected.roll3, frame.roll3.toString());
    BowlingGlue.#assertField(where + "Score", expected.score, frame.score.toString());
    BowlingGlue.#assertField(where + "TotalScore", expected.totalScore, frame.totalScore.toString());
  }

  /** Honours the ?DNC? marker the generated *String classes use. */
  static #assertField(what, expected, actual) {
    if (expected === DNC_STRING) return;
    expect(`${what}: ${actual.trim()}`).toBe(`${what}: ${expected.trim()}`);
  }

  static #isTrue(text) {
    return ["yes", "true", "y", "1"].includes(String(text).trim().toLowerCase());
  }
}
