// Typed field accessors layered over the built-in JSON object.
//
// A missing key or a value of the wrong type throws a TypeError.  An explicit
// JSON null is passed through as null rather than treated as an error.

export function parse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new TypeError(`Invalid JSON: ${e.message}`);
  }
}

export function stringify(value) {
  return JSON.stringify(value);
}

function describe(value) {
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

function typeError(ctx, expected, value) {
  return new TypeError(`JSON field '${ctx}' is not ${expected} (got ${describe(value)})`);
}

export function require(obj, key) {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj))
    throw new TypeError(`Expected an object holding field '${key}'`);
  if (!Object.prototype.hasOwnProperty.call(obj, key))
    throw new TypeError(`Missing JSON field '${key}'`);
  return obj[key];
}

export function asString(value, ctx) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  throw typeError(ctx, "a string", value);
}

export function asNumber(value, ctx) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  throw typeError(ctx, "a number", value);
}

export function asInt(value, ctx) {
  const n = asNumber(value, ctx);
  if (!Number.isInteger(n)) throw typeError(ctx, "an integer", value);
  return n;
}

export function asBool(value, ctx) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const low = value.trim().toLowerCase();
    if (["true", "t", "yes", "y", "1"].includes(low)) return true;
    if (["false", "f", "no", "n", "0"].includes(low)) return false;
  }
  throw typeError(ctx, "a boolean", value);
}

export function asArray(value, ctx) {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return value;
  throw typeError(ctx, "an array", value);
}
