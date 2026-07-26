use super::*;

/// Holds IDValue records and sums the ones carrying a given ID.
#[derive(Debug, Clone, Default)]
pub struct RecordFilter {
    entries: Vec<IDValue>,
}

impl RecordFilter {
    pub fn new() -> Self { Self::default() }

    pub fn add(&mut self, entry: IDValue) { self.entries.push(entry); }

    pub fn sum_by_label(&self, filter_label: &IDForm) -> i32 {
        self.entries.iter()
            .filter(|e| &e.id == filter_label)
            .map(|e| e.value)
            .sum()
    }
}
