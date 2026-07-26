// Typed field accessors layered over the built-in JSON object.
//
// A missing key or a value of the wrong type throws a TypeError. An explicit
// JSON null reads as the empty/zero value, matching the Go, Rust and Swift
// targets, so the accessors can return non-nullable types and the generated
// constructors stay strict-mode clean.

export function parse(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch (e) {
    throw new TypeError(`Invalid JSON: ${e instanceof Error ? e.message : String(e)}`);
  }
}

export function stringify(value: unknown): string {
  return JSON.stringify(value);
}

function describe(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (Array.isArray(value)) return "an array";
  switch (typeof value) {
    case "boolean": return "a boolean";
    case "number":  return "a number";
    case "string":  return "a string";
    case "object":  return "an object";
    default:        return typeof value;
  }
}

function typeError(ctx: string, expected: string, value: unknown): TypeError {
  return new TypeError(`JSON field '${ctx}' is not ${expected} (got ${describe(value)})`);
}

/** Named requireField rather than require to stay clear of the CommonJS global. */
export function requireField(obj: unknown, key: string): unknown {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj))
    throw new TypeError(`Expected an object holding field '${key}'`);
  if (!Object.prototype.hasOwnProperty.call(obj, key))
    throw new TypeError(`Missing JSON field '${key}'`);
  return (obj as Record<string, unknown>)[key];
}

export function asString(value: unknown, ctx: string): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  throw typeError(ctx, "a string", value);
}

export function asNumber(value: unknown, ctx: string): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  throw typeError(ctx, "a number", value);
}

export function asInt(value: unknown, ctx: string): number {
  const n = asNumber(value, ctx);
  if (!Number.isInteger(n)) throw typeError(ctx, "an integer", value);
  return n;
}

export function asBool(value: unknown, ctx: string): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const low = value.trim().toLowerCase();
    if (["true", "t", "yes", "y", "1"].includes(low)) return true;
    if (["false", "f", "no", "n", "0"].includes(low)) return false;
  }
  throw typeError(ctx, "a boolean", value);
}

export function asArray(value: unknown, ctx: string): unknown[] | null {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return value as unknown[];
  throw typeError(ctx, "an array", value);
}
