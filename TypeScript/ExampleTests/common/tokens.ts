// The text form of an Entity: its attribute values as space separated tokens,
// in the order the attributes are declared. A value containing a space is
// wrapped in double quotes; a nested Entity's own text form is wrapped in
// single quotes. A run of spaces separates exactly as a single space does.

export function split(text: string | null | undefined): string[] {
  const out: string[] = [];
  if (text === null || text === undefined) return out;
  const n = text.length;
  let i = 0;
  while (i < n) {
    while (i < n && /\s/.test(text[i])) i++;
    if (i >= n) break;
    const c = text[i];
    if (c === '"' || c === "'") {
      const close = closingQuote(text, i, c);
      out.push(text.slice(i + 1, close));
      i = close + 1;
    } else {
      let j = i;
      while (j < n && !/\s/.test(text[j])) j++;
      out.push(text.slice(i, j));
      i = j;
    }
  }
  return out;
}

// The closing quote is the next one of the same kind followed by whitespace or
// the end of the text, which is what lets a nested Entity, itself single
// quoted, sit inside a single quoted value.
function closingQuote(text: string, open: number, quote: string): number {
  for (let j = open + 1; j < text.length; j++) {
    if (text[j] !== quote) continue;
    if (j + 1 === text.length || /\s/.test(text[j + 1])) return j;
  }
  throw new Error(`No closing ${quote} in: ${text}`);
}

export function token(value: string | null | undefined): string {
  if (value === null || value === undefined || value === "") return '""';
  return /\s/.test(value) ? `"${value}"` : value;
}

export function nested(text: string | null | undefined): string {
  return `'${text ?? ""}'`;
}

export function require_(text: string, expected: number, typeName: string): string[] {
  const parts = split(text);
  if (parts.length !== expected)
    throw new Error(`${typeName} takes ${expected} values but got ${parts.length}: ${text}`);
  return parts;
}
