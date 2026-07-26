//! Minimal dependency-free JSON reader/writer used by the generated Typed structs.
//!
//! No external crate is required. A missing field or a value of the wrong type
//! produces `Err(JsonError)`; an explicit JSON null is passed through.

#![allow(dead_code)]

use std::collections::BTreeMap;
use std::fmt;

#[derive(Debug, Clone, PartialEq)]
pub struct JsonError {
    pub message: String,
}

impl JsonError {
    pub fn new(message: impl Into<String>) -> Self {
        Self { message: message.into() }
    }
}

impl fmt::Display for JsonError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl std::error::Error for JsonError {}

pub type JsonResult<T> = Result<T, JsonError>;

/// A parsed JSON value. Numbers keep their source text so that decimal and
/// long integer fields survive a round trip exactly.
#[derive(Debug, Clone, PartialEq)]
pub enum Value {
    Null,
    Bool(bool),
    Number(String),
    Str(String),
    Array(Vec<Value>),
    Object(Vec<(String, Value)>),
}

impl Value {
    pub fn number_from_i64(v: i64) -> Value { Value::Number(v.to_string()) }

    pub fn number_from_f64(v: f64) -> Value {
        if v.is_finite() {
            // {:?} gives the shortest representation that round-trips.
            Value::Number(format!("{:?}", v))
        } else {
            Value::Null
        }
    }

    pub fn get(&self, key: &str) -> Option<&Value> {
        match self {
            Value::Object(members) => members.iter().find(|(k, _)| k == key).map(|(_, v)| v),
            _ => None,
        }
    }

    pub fn describe(&self) -> &'static str {
        match self {
            Value::Null      => "null",
            Value::Bool(_)   => "a boolean",
            Value::Number(_) => "a number",
            Value::Str(_)    => "a string",
            Value::Array(_)  => "an array",
            Value::Object(_) => "an object",
        }
    }
}

/// Kept so callers that prefer a map view have one; the parser preserves order.
pub fn to_map(value: &Value) -> BTreeMap<String, Value> {
    match value {
        Value::Object(members) => members.iter().cloned().collect(),
        _ => BTreeMap::new(),
    }
}

// ---------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------

pub fn escape_into(out: &mut String, s: &str) {
    out.push('"');
    for c in s.chars() {
        match c {
            '"'  => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\u{08}' => out.push_str("\\b"),
            '\u{0c}' => out.push_str("\\f"),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            c if (c as u32) < 0x20 => out.push_str(&format!("\\u{:04x}", c as u32)),
            c => out.push(c),
        }
    }
    out.push('"');
}

pub fn write_into(out: &mut String, value: &Value) {
    match value {
        Value::Null      => out.push_str("null"),
        Value::Bool(b)   => out.push_str(if *b { "true" } else { "false" }),
        Value::Number(n) => out.push_str(n),
        Value::Str(s)    => escape_into(out, s),
        Value::Array(items) => {
            out.push('[');
            for (i, item) in items.iter().enumerate() {
                if i > 0 { out.push(','); }
                write_into(out, item);
            }
            out.push(']');
        }
        Value::Object(members) => {
            out.push('{');
            for (i, (k, v)) in members.iter().enumerate() {
                if i > 0 { out.push(','); }
                escape_into(out, k);
                out.push(':');
                write_into(out, v);
            }
            out.push('}');
        }
    }
}

pub fn write(value: &Value) -> String {
    let mut out = String::new();
    write_into(&mut out, value);
    out
}

// ---------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------

struct Parser<'a> {
    src: &'a [u8],
    text: &'a str,
    i: usize,
}

impl<'a> Parser<'a> {
    fn new(text: &'a str) -> Self {
        Self { src: text.as_bytes(), text, i: 0 }
    }

    fn err<T>(&self, msg: &str) -> JsonResult<T> {
        Err(JsonError::new(format!("{} at offset {}", msg, self.i)))
    }

    fn at_end(&self) -> bool { self.i >= self.src.len() }

    fn skip_ws(&mut self) {
        while self.i < self.src.len() {
            match self.src[self.i] {
                b' ' | b'\t' | b'\n' | b'\r' => self.i += 1,
                _ => break,
            }
        }
    }

    fn expect_word(&mut self, word: &str) -> JsonResult<()> {
        if self.text[self.i..].starts_with(word) {
            self.i += word.len();
            Ok(())
        } else {
            self.err(&format!("Expected '{}'", word))
        }
    }

    fn read_value(&mut self) -> JsonResult<Value> {
        self.skip_ws();
        if self.at_end() {
            return self.err("Unexpected end of JSON input");
        }
        match self.src[self.i] {
            b'{' => self.read_object(),
            b'[' => self.read_array(),
            b'"' => Ok(Value::Str(self.read_string()?)),
            b't' => { self.expect_word("true")?;  Ok(Value::Bool(true)) }
            b'f' => { self.expect_word("false")?; Ok(Value::Bool(false)) }
            b'n' => { self.expect_word("null")?;  Ok(Value::Null) }
            _    => self.read_number(),
        }
    }

    fn read_object(&mut self) -> JsonResult<Value> {
        let mut members: Vec<(String, Value)> = Vec::new();
        self.i += 1; // consume '{'
        self.skip_ws();
        if !self.at_end() && self.src[self.i] == b'}' {
            self.i += 1;
            return Ok(Value::Object(members));
        }
        loop {
            self.skip_ws();
            if self.at_end() || self.src[self.i] != b'"' {
                return self.err("Expected a string key");
            }
            let key = self.read_string()?;
            self.skip_ws();
            if self.at_end() || self.src[self.i] != b':' {
                return self.err(&format!("Expected ':' after key '{}'", key));
            }
            self.i += 1;
            let value = self.read_value()?;
            members.push((key, value));
            self.skip_ws();
            if self.at_end() {
                return self.err("Unterminated object");
            }
            match self.src[self.i] {
                b',' => { self.i += 1; }
                b'}' => { self.i += 1; return Ok(Value::Object(members)); }
                _ => return self.err("Expected ',' or '}'"),
            }
        }
    }

    fn read_array(&mut self) -> JsonResult<Value> {
        let mut items: Vec<Value> = Vec::new();
        self.i += 1; // consume '['
        self.skip_ws();
        if !self.at_end() && self.src[self.i] == b']' {
            self.i += 1;
            return Ok(Value::Array(items));
        }
        loop {
            items.push(self.read_value()?);
            self.skip_ws();
            if self.at_end() {
                return self.err("Unterminated array");
            }
            match self.src[self.i] {
                b',' => { self.i += 1; }
                b']' => { self.i += 1; return Ok(Value::Array(items)); }
                _ => return self.err("Expected ',' or ']'"),
            }
        }
    }

    fn read_hex4(&mut self) -> JsonResult<u32> {
        if self.i + 4 > self.src.len() {
            return self.err("Truncated \\u escape");
        }
        let mut cp: u32 = 0;
        for k in 0..4 {
            let c = self.src[self.i + k];
            let d = match c {
                b'0'..=b'9' => (c - b'0') as u32,
                b'a'..=b'f' => (c - b'a' + 10) as u32,
                b'A'..=b'F' => (c - b'A' + 10) as u32,
                _ => return self.err("Invalid \\u escape"),
            };
            cp = (cp << 4) | d;
        }
        self.i += 4;
        Ok(cp)
    }

    fn read_string(&mut self) -> JsonResult<String> {
        self.i += 1; // consume opening quote
        let mut out = String::new();
        loop {
            if self.at_end() {
                return self.err("Unterminated string");
            }
            let c = self.src[self.i];
            if c == b'"' {
                self.i += 1;
                return Ok(out);
            }
            if c != b'\\' {
                // Copy one whole UTF-8 character.
                let rest = &self.text[self.i..];
                let ch = match rest.chars().next() {
                    Some(ch) => ch,
                    None => return self.err("Unterminated string"),
                };
                out.push(ch);
                self.i += ch.len_utf8();
                continue;
            }
            self.i += 1; // consume backslash
            if self.at_end() {
                return self.err("Unterminated escape");
            }
            let e = self.src[self.i];
            self.i += 1;
            match e {
                b'"'  => out.push('"'),
                b'\\' => out.push('\\'),
                b'/'  => out.push('/'),
                b'b'  => out.push('\u{08}'),
                b'f'  => out.push('\u{0c}'),
                b'n'  => out.push('\n'),
                b'r'  => out.push('\r'),
                b't'  => out.push('\t'),
                b'u'  => {
                    let mut cp = self.read_hex4()?;
                    // Combine a surrogate pair when both halves are present.
                    if (0xD800..=0xDBFF).contains(&cp)
                        && self.i + 1 < self.src.len()
                        && self.src[self.i] == b'\\'
                        && self.src[self.i + 1] == b'u'
                    {
                        let save = self.i;
                        self.i += 2;
                        let lo = self.read_hex4()?;
                        if (0xDC00..=0xDFFF).contains(&lo) {
                            cp = 0x10000 + ((cp - 0xD800) << 10) + (lo - 0xDC00);
                        } else {
                            self.i = save;
                        }
                    }
                    match char::from_u32(cp) {
                        Some(ch) => out.push(ch),
                        None => return self.err("Invalid code point in \\u escape"),
                    }
                }
                _ => return self.err("Invalid escape"),
            }
        }
    }

    fn read_number(&mut self) -> JsonResult<Value> {
        let start = self.i;
        if !self.at_end() && self.src[self.i] == b'-' {
            self.i += 1;
        }
        while !self.at_end() {
            match self.src[self.i] {
                b'0'..=b'9' | b'.' | b'e' | b'E' | b'+' | b'-' => self.i += 1,
                _ => break,
            }
        }
        if start == self.i {
            return self.err("Expected a value");
        }
        let text = &self.text[start..self.i];
        if text.parse::<f64>().is_err() {
            return Err(JsonError::new(format!(
                "Invalid number '{}' at offset {}", text, start)));
        }
        Ok(Value::Number(text.to_string()))
    }
}

pub fn parse(text: &str) -> JsonResult<Value> {
    let mut p = Parser::new(text);
    let v = p.read_value()?;
    p.skip_ws();
    if !p.at_end() {
        return Err(JsonError::new(format!("Trailing content at offset {}", p.i)));
    }
    Ok(v)
}

// ---------------------------------------------------------------------
// Field accessors
// ---------------------------------------------------------------------

fn type_error<T>(ctx: &str, expected: &str, actual: &Value) -> JsonResult<T> {
    Err(JsonError::new(format!(
        "JSON field '{}' is not {} (got {})", ctx, expected, actual.describe())))
}

pub fn require<'a>(obj: &'a Value, key: &str) -> JsonResult<&'a Value> {
    match obj {
        Value::Object(_) => obj
            .get(key)
            .ok_or_else(|| JsonError::new(format!("Missing JSON field '{}'", key))),
        _ => Err(JsonError::new(format!(
            "Expected an object holding field '{}'", key))),
    }
}

pub fn as_string(v: &Value, ctx: &str) -> JsonResult<String> {
    match v {
        Value::Str(s)    => Ok(s.clone()),
        Value::Number(n) => Ok(n.clone()),
        Value::Bool(b)   => Ok(if *b { "true".to_string() } else { "false".to_string() }),
        Value::Null      => Ok(String::new()),
        _ => type_error(ctx, "a string", v),
    }
}

pub fn as_f64(v: &Value, ctx: &str) -> JsonResult<f64> {
    match v {
        Value::Number(n) => n.parse::<f64>().map_err(|_| {
            JsonError::new(format!("JSON field '{}' is not a number", ctx))
        }),
        Value::Str(s) => s.trim().parse::<f64>().map_err(|_| {
            JsonError::new(format!("JSON field '{}' is not a number", ctx))
        }),
        _ => type_error(ctx, "a number", v),
    }
}

pub fn as_i32(v: &Value, ctx: &str) -> JsonResult<i32> {
    let d = as_f64(v, ctx)?;
    if d.fract() != 0.0 || d < i32::MIN as f64 || d > i32::MAX as f64 {
        return type_error(ctx, "an integer", v);
    }
    Ok(d as i32)
}

pub fn as_bool(v: &Value, ctx: &str) -> JsonResult<bool> {
    match v {
        Value::Bool(b) => Ok(*b),
        Value::Str(s) => {
            let low = s.trim().to_lowercase();
            match low.as_str() {
                "true"  | "t" | "yes" | "y" | "1" => Ok(true),
                "false" | "f" | "no"  | "n" | "0" => Ok(false),
                _ => type_error(ctx, "a boolean", v),
            }
        }
        _ => type_error(ctx, "a boolean", v),
    }
}

pub fn as_array<'a>(v: &'a Value, ctx: &str) -> JsonResult<&'a Vec<Value>> {
    match v {
        Value::Array(items) => Ok(items),
        _ => type_error(ctx, "an array", v),
    }
}
