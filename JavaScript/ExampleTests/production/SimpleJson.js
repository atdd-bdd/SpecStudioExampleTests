/**
 * The compact JSON-like text used by the Json specification: names are not
 * quoted, values are, and whitespace between tokens is insignificant.
 *
 *     {anInt:"1",aString:"B"}
 *     [{anInt:"1",aString:"B"},{anInt:"2",aString:"C"}]
 *
 * Field order is preserved, so a canonical form can be compared directly.
 */

// ---------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------

/** `fields` is an array of [name, value] pairs, which keeps the declared order. */
export function toObject(fields) {
  const parts = fields.map(([name, value]) => `${name}:${quoted(value)}`);
  return `{${parts.join(",")}}`;
}

export function toArray(rows) {
  return `[${rows.map(toObject).join(",")}]`;
}

function quoted(value) {
  let out = '"';
  for (const c of String(value ?? "")) {
    if (c === '"' || c === "\\") out += "\\";
    out += c;
  }
  return out + '"';
}

// ---------------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------------

export function parseObject(text) {
  const c = new Cursor(text);
  const fields = readObject(c);
  c.skipWhitespace();
  if (!c.atEnd()) throw new SyntaxError(`Unexpected text after object at ${c.i}`);
  return fields;
}

export function parseArray(text) {
  const c = new Cursor(text);
  c.skipWhitespace();
  c.expect("[");
  const rows = [];
  c.skipWhitespace();
  if (c.peek() === "]") {
    c.next();
  } else {
    for (;;) {
      rows.push(readObject(c));
      c.skipWhitespace();
      const d = c.next();
      if (d === ",") continue;
      if (d === "]") break;
      throw new SyntaxError(`Expected ',' or ']' at ${c.i}`);
    }
  }
  c.skipWhitespace();
  if (!c.atEnd()) throw new SyntaxError(`Unexpected text after array at ${c.i}`);
  return rows;
}

/**
 * Removes whitespace that sits between tokens, leaving a plain string that can
 * be compared to another one directly. Whitespace inside a quoted value is part
 * of the value and is kept.
 */
export function withoutWhitespace(text) {
  if (text == null) return "";
  const chars = Array.from(String(text));
  let out = "";
  let inQuotes = false;
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (inQuotes) {
      out += c;
      if (c === "\\" && i + 1 < chars.length) {
        out += chars[i + 1];
        i++;
      } else if (c === '"') {
        inQuotes = false;
      }
    } else if (c === '"') {
      inQuotes = true;
      out += c;
    } else if (!/\s/.test(c)) {
      out += c;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------

function readObject(c) {
  c.skipWhitespace();
  c.expect("{");
  const fields = [];
  c.skipWhitespace();
  if (c.peek() === "}") {
    c.next();
    return fields;
  }
  for (;;) {
    c.skipWhitespace();
    const name = readName(c);
    c.skipWhitespace();
    c.expect(":");
    c.skipWhitespace();
    fields.push([name, readValue(c)]);
    c.skipWhitespace();
    const d = c.next();
    if (d === ",") continue;
    if (d === "}") return fields;
    throw new SyntaxError(`Expected ',' or '}' at ${c.i}`);
  }
}

/** A name is bare text up to the colon, or a quoted string. */
function readName(c) {
  if (c.peek() === '"') return readQuoted(c);
  let out = "";
  while (!c.atEnd() && c.peek() !== ":") out += c.next();
  return out.trim();
}

/** A value is a quoted string, or bare text up to the next ',' or '}'. */
function readValue(c) {
  if (c.peek() === '"') return readQuoted(c);
  let out = "";
  while (!c.atEnd() && c.peek() !== "," && c.peek() !== "}") out += c.next();
  return out.trim();
}

function readQuoted(c) {
  c.expect('"');
  let out = "";
  for (;;) {
    if (c.atEnd()) throw new SyntaxError(`Unterminated string at ${c.i}`);
    let ch = c.next();
    if (ch === '"') return out;
    if (ch === "\\" && !c.atEnd()) ch = c.next();
    out += ch;
  }
}

class Cursor {
  constructor(text) {
    this.text = Array.from(String(text ?? ""));
    this.i = 0;
  }

  atEnd() {
    return this.i >= this.text.length;
  }

  peek() {
    return this.atEnd() ? "" : this.text[this.i];
  }

  next() {
    return this.atEnd() ? "" : this.text[this.i++];
  }

  skipWhitespace() {
    while (!this.atEnd() && /\s/.test(this.text[this.i])) this.i++;
  }

  expect(expected) {
    this.skipWhitespace();
    if (this.next() !== expected) {
      throw new SyntaxError(`Expected '${expected}' at ${this.i}`);
    }
  }
}
