#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct SimpleClassString {
    pub anint: String,
    pub astring: String,
}

impl SimpleClassString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            anint: v.get(0).copied().unwrap_or("").to_string(),
            astring: v.get(1).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for SimpleClassString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "anInt={}, aString={}",
            self.anint,
            self.astring
        )
    }
}

impl PartialEq for SimpleClassString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.anint, &other.anint)
            && crate::common::dnc_equal(&self.astring, &other.astring)
    }
}
