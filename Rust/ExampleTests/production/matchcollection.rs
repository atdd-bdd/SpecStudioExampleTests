use super::*;

pub const MATCHCOLLECTION_MINIMUM: usize = 0;
pub const MATCHCOLLECTION_MAXIMUM: usize = 10000;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct MatchCollection {
    items: Vec<Match>,
}

impl MatchCollection {
    pub fn new() -> Self { Self::default() }

    pub fn add(&mut self, item: Match) {
        self.items.push(item);
    }

    pub fn delete(&mut self, item: &Match) -> bool
    where
        Match: PartialEq,
    {
        if let Some(pos) = self.items.iter().position(|x| x == item) {
            self.items.remove(pos);
            true
        } else { false }
    }

    pub fn read(&self) -> &[Match] {
        &self.items
    }

    pub fn update(&mut self, old_item: &Match, new_item: Match) -> bool
    where
        Match: PartialEq,
    {
        if let Some(pos) = self.items.iter().position(|x| x == old_item) {
            self.items[pos] = new_item;
            true
        } else { false }
    }

    pub fn size(&self) -> usize { self.items.len() }
}
