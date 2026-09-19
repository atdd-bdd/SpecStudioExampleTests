/**
 * The number of pins knocked down by one roll, or -1 (TBR) when the roll has not
 * happened yet.
 *
 * The spec's ValidValues table is the contract: 0 and 10 are valid, 11 and -2
 * are not, and -1 -- the spec's =TBR -- is valid because a scoresheet shows rolls that
 * are still to come. The constructor refuses exactly the invalid ones, so a
 * number out of range fails the same way an unparseable one does.
 */
export class Pins {
  /** Marker for a roll that has not been made: the integer the spec defines TBR as. */
  static TBR_VALUE = -1;

  static MAX = 10;

  value;

  /** From the text form a table cell holds, or from a count. */
  constructor(value) {
    const text = String(value ?? "").trim();
    if (!/^[+-]?\d+$/.test(text))
      throw new Error(`Not a number of pins: ${text}`);

    const count = Number(text);
    if (count !== Pins.TBR_VALUE && (count < 0 || count > Pins.MAX))
      throw new Error(`Roll must be between 0 and ${Pins.MAX}, got ${count}`);
    this.value = count;
  }

  /** False when this is TBR -- the roll has not been made. */
  isRolled() {
    return this.value !== Pins.TBR_VALUE;
  }

  /** Pin count, or -1 when the roll has not been made. */
  count() {
    return this.value;
  }

  isStrike() {
    return this.isRolled() && this.value === Pins.MAX;
  }

  /** The text form: what a table cell holds. */
  toString() {
    return String(this.value);
  }
}

/** The value a roll not yet made carries. */
Pins.TBR = new Pins(Pins.TBR_VALUE);
