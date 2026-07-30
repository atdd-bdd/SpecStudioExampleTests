//! The compact JSON-like text used by the Json specification: names are not
//! quoted, values are, and whitespace between tokens is insignificant.
//!
//! ```text
//! {anInt:"1",aString:"B"}
//! [{anInt:"1",aString:"B"},{anInt:"2",aString:"C"}]
//! ```
//!
//! Field order is preserved, so a canonical form can be compared directly.

/// One name/value pair. A vector of these keeps the declared order, which a map
/// would not.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Field {
    pub name: String,
    pub value: String,
}

impl Field {
    pub fn new(name: &str, value: &str) -> Self {
        Self { name: name.to_string(), value: value.to_string() }
    }
}

// ---------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------

pub fn to_object(fields: &[Field]) -> String {
    let mut out = String::from("{");
    for (i, f) in fields.iter().enumerate() {
        if i > 0 {
            out.push(',');
        }
        out.push_str(&f.name);
        out.push(':');
        push_quoted(&mut out, &f.value);
    }
    out.push('}');
    out
}

pub fn to_array(rows: &[Vec<Field>]) -> String {
    let mut out = String::from("[");
    for (i, row) in rows.iter().enumerate() {
        if i > 0 {
            out.push(',');
        }
        out.push_str(&to_object(row));
    }
    out.push(']');
    out
}

fn push_quoted(out: &mut String, value: &str) {
    out.push('"');
    for c in value.chars() {
        if c == '"' || c == '\\' {
            out.push('\\');
        }
        out.push(c);
    }
    out.push('"');
}

// ---------------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------------

pub fn parse_object(text: &str) -> Result<Vec<Field>, String> {
    let mut c = Cursor::new(text);
    let fields = read_object(&mut c)?;
    c.skip_whitespace();
    if !c.at_end() {
        return Err(format!("unexpected text after object at {}", c.i));
    }
    Ok(fields)
}

pub fn parse_array(text: &str) -> Result<Vec<Vec<Field>>, String> {
    let mut c = Cursor::new(text);
    c.skip_whitespace();
    c.expect('[')?;
    let mut rows = Vec::new();
    c.skip_whitespace();
    if c.peek() == Some(']') {
        c.next();
    } else {
        loop {
            rows.push(read_object(&mut c)?);
            c.skip_whitespace();
            match c.next() {
                Some(',') => continue,
                Some(']') => break,
                _ => return Err(format!("expected ',' or ']' at {}", c.i)),
            }
        }
    }
    c.skip_whitespace();
    if !c.at_end() {
        return Err(format!("unexpected text after array at {}", c.i));
    }
    Ok(rows)
}

/// Removes whitespace that sits between tokens, leaving a plain string that can
/// be compared to another one directly. Whitespace inside a quoted value is part
/// of the value and is kept.
pub fn without_whitespace(text: &str) -> String {
    let chars: Vec<char> = text.chars().collect();
    let mut out = String::with_capacity(chars.len());
    let mut in_quotes = false;
    let mut i = 0;
    while i < chars.len() {
        let c = chars[i];
        if in_quotes {
            out.push(c);
            if c == '\\' && i + 1 < chars.len() {
                out.push(chars[i + 1]);
                i += 1;
            } else if c == '"' {
                in_quotes = false;
            }
        } else if c == '"' {
            in_quotes = true;
            out.push(c);
        } else if !c.is_whitespace() {
            out.push(c);
        }
        i += 1;
    }
    out
}

// ---------------------------------------------------------------------------

fn read_object(c: &mut Cursor) -> Result<Vec<Field>, String> {
    c.skip_whitespace();
    c.expect('{')?;
    let mut fields = Vec::new();
    c.skip_whitespace();
    if c.peek() == Some('}') {
        c.next();
        return Ok(fields);
    }
    loop {
        c.skip_whitespace();
        let name = read_name(c)?;
        c.skip_whitespace();
        c.expect(':')?;
        c.skip_whitespace();
        let value = read_value(c)?;
        fields.push(Field { name, value });
        c.skip_whitespace();
        match c.next() {
            Some(',') => continue,
            Some('}') => return Ok(fields),
            _ => return Err(format!("expected ',' or '}}' at {}", c.i)),
        }
    }
}

/// A name is bare text up to the colon, or a quoted string.
fn read_name(c: &mut Cursor) -> Result<String, String> {
    if c.peek() == Some('"') {
        return read_quoted(c);
    }
    let mut out = String::new();
    while !c.at_end() && c.peek() != Some(':') {
        out.push(c.next().unwrap());
    }
    Ok(out.trim().to_string())
}

/// A value is a quoted string, or bare text up to the next ',' or '}'.
fn read_value(c: &mut Cursor) -> Result<String, String> {
    if c.peek() == Some('"') {
        return read_quoted(c);
    }
    let mut out = String::new();
    while !c.at_end() && c.peek() != Some(',') && c.peek() != Some('}') {
        out.push(c.next().unwrap());
    }
    Ok(out.trim().to_string())
}

fn read_quoted(c: &mut Cursor) -> Result<String, String> {
    c.expect('"')?;
    let mut out = String::new();
    loop {
        if c.at_end() {
            return Err(format!("unterminated string at {}", c.i));
        }
        let mut ch = c.next().unwrap();
        if ch == '"' {
            return Ok(out);
        }
        if ch == '\\' && !c.at_end() {
            ch = c.next().unwrap();
        }
        out.push(ch);
    }
}

struct Cursor {
    text: Vec<char>,
    i: usize,
}

impl Cursor {
    fn new(text: &str) -> Self {
        Self { text: text.chars().collect(), i: 0 }
    }

    fn at_end(&self) -> bool {
        self.i >= self.text.len()
    }

    fn peek(&self) -> Option<char> {
        self.text.get(self.i).copied()
    }

    fn next(&mut self) -> Option<char> {
        let c = self.text.get(self.i).copied();
        if c.is_some() {
            self.i += 1;
        }
        c
    }

    fn skip_whitespace(&mut self) {
        while let Some(c) = self.peek() {
            if !c.is_whitespace() {
                break;
            }
            self.i += 1;
        }
    }

    fn expect(&mut self, expected: char) -> Result<(), String> {
        self.skip_whitespace();
        if self.next() != Some(expected) {
            return Err(format!("expected '{expected}' at {}", self.i));
        }
        Ok(())
    }
}
