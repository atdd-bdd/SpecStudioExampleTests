use super::*;

#[derive(Debug, Clone, PartialEq)]
pub struct IDValue {
    pub id: IDForm,
    pub value: i32,
}

impl IDValue {
    pub fn new(id: IDForm, value: i32) -> Self {
        Self { id,  value }
    }
}
