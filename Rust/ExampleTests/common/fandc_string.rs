#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct FandCString {
    pub f: String,
    pub c: String,
    pub notes: String,
}

impl FandCString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            f: v.get(0).copied().unwrap_or("").to_string(),
            c: v.get(1).copied().unwrap_or("").to_string(),
            notes: v.get(2).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for FandCString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "F={}, C={}, Notes={}",
            self.f,
            self.c,
            self.notes
        )
    }
}

impl PartialEq for FandCString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.f, &other.f)
            && crate::common::dnc_equal(&self.c, &other.c)
            && crate::common::dnc_equal(&self.notes, &other.notes)
    }
}
