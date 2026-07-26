/**
 * The DataTypes the specifications declare. Each constructor throws a
 * RangeError when the text does not satisfy its rule, so the glue can state
 * whether a value was meant to be valid.
 */

/** A monetary amount: never negative, never finer than a cent.
 *  Held as whole cents so the arithmetic is exact. */
export class Dollar {
  readonly cents: number;

  constructor(value: string | number) {
    if (typeof value === "number") { this.cents = value; return; }
    const text = String(value ?? "").replace(/\$/g, "").trim();
    if (text === "") { this.cents = 0; return; }

    const negative = text.startsWith("-");
    const digits = text.replace(/^[-+]/, "");
    const parts = digits.split(".");
    if (parts.length > 2) throw new RangeError(`Not a number: ${value}`);
    const whole = parts[0] ?? "";
    const frac = parts[1] ?? "";

    if (whole === "" && frac === "") throw new RangeError(`Not a number: ${value}`);
    if (!/^\d*$/.test(whole) || !/^\d*$/.test(frac)) {
      throw new RangeError(`Not a number: ${value}`);
    }
    if (frac.length > 2) {
      throw new RangeError(
        `Dollar amount must not have more than two decimal digits: ${value}`);
    }
    const wv = whole === "" ? 0 : parseInt(whole, 10);
    const fv = frac.length === 0 ? 0
             : frac.length === 1 ? parseInt(frac, 10) * 10
             : parseInt(frac, 10);
    const total = wv * 100 + fv;
    if (negative && total !== 0) {
      throw new RangeError(`Dollar amount cannot be negative: ${value}`);
    }
    this.cents = total;
  }

  plus(other: Dollar): Dollar { return new Dollar(this.cents + other.cents); }
  minus(other: Dollar): Dollar { return new Dollar(this.cents - other.cents); }
  times(factor: number): Dollar { return new Dollar(this.cents * factor); }

  /** The given percentage of this amount, rounded half up to the nearest cent. */
  percentOf(percentage: Percentage): Dollar {
    return new Dollar(Math.trunc((this.cents * percentage.value + 50) / 100));
  }

  equals(other: Dollar): boolean { return other instanceof Dollar && other.cents === this.cents; }

  toString(): string {
    const sign = this.cents < 0 ? "-" : "";
    const c = Math.abs(this.cents);
    return `${sign}${Math.trunc(c / 100)}.${String(c % 100).padStart(2, "0")}`;
  }
}

/** A percentage from 0 to 100 inclusive. */
export class Percentage {
  readonly value: number;

  constructor(value: string | number) {
    if (typeof value === "number") {
      if (value < 0 || value > 100) {
        throw new RangeError(`Percentage must be between 0 and 100: ${value}`);
      }
      this.value = value;
      return;
    }
    const text = String(value ?? "").replace(/%/g, "").trim();
    if (!/^-?\d+$/.test(text)) throw new RangeError(`Not a number: ${value}`);
    const n = parseInt(text, 10);
    if (n < 0 || n > 100) {
      throw new RangeError(`Percentage must be between 0 and 100: ${value}`);
    }
    this.value = n;
  }

  equals(other: Percentage): boolean { return other instanceof Percentage && other.value === this.value; }
  toString(): string { return String(this.value); }
}

/** Alphabetic, numeric, space, hyphen, period, comma — nothing else. */
export class SimpleText {
  readonly value: string;

  constructor(value: string) {
    this.value = value ?? "";
    if (!/^[ a-zA-Z0-9,.\-]*$/.test(this.value)) {
      throw new RangeError(`Invalid SimpleText: ${this.value}`);
    }
  }

  equals(other: SimpleText): boolean { return other instanceof SimpleText && other.value === this.value; }
  toString(): string { return this.value; }
}

/** Exactly five characters, beginning with Q. */
export class IDForm {
  readonly value: string;

  constructor(value: string) {
    this.value = value ?? "";
    if (this.value.length !== 5 || !this.value.startsWith("Q")) {
      throw new RangeError("Must be 5 characters starting with Q");
    }
  }

  equals(other: IDForm): boolean { return other instanceof IDForm && other.value === this.value; }
  toString(): string { return this.value; }
}
