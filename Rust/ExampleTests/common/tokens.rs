#![allow(dead_code)]

//! The text form of an Entity: its attribute values as space separated
//! tokens, in the order the attributes are declared. A value containing a
//! space is wrapped in double quotes; a nested Entity's own text form is
//! wrapped in single quotes. A run of spaces separates exactly as one does.

pub fn split(text: &str) -> Vec<String> {
    let r: Vec<char> = text.chars().collect();
    let n = r.len();
    let mut out: Vec<String> = Vec::new();
    let mut i = 0usize;
    while i < n {
        while i < n && r[i].is_whitespace() { i += 1; }
        if i >= n { break; }
        let c = r[i];
        if c == '"' || c == '\'' {
            match closing_quote(&r, i, c) {
                Some(close) => {
                    out.push(r[i + 1..close].iter().collect());
                    i = close + 1;
                }
                None => {
                    out.push(r[i + 1..].iter().collect());
                    break;
                }
            }
        } else {
            let mut j = i;
            while j < n && !r[j].is_whitespace() { j += 1; }
            out.push(r[i..j].iter().collect());
            i = j;
        }
    }
    out
}

// The closing quote is the next one of the same kind followed by whitespace
// or the end of the text, which is what lets a nested Entity, itself single
// quoted, sit inside a single quoted value.
fn closing_quote(r: &[char], open: usize, quote: char) -> Option<usize> {
    for j in (open + 1)..r.len() {
        if r[j] != quote { continue; }
        if j + 1 == r.len() || r[j + 1].is_whitespace() { return Some(j); }
    }
    None
}

pub fn token(value: &str) -> String {
    if value.is_empty() { return "\"\"".to_string(); }
    if value.chars().any(|c| c.is_whitespace()) {
        return format!("\"{}\"", value);
    }
    value.to_string()
}

pub fn nested(text: &str) -> String {
    format!("'{}'", text)
}

pub fn require(text: &str, expected: usize, type_name: &str) -> Vec<String> {
    let parts = split(text);
    if parts.len() != expected {
        panic!("{} takes {} values but got {}: {}",
               type_name, expected, parts.len(), text);
    }
    parts
}
