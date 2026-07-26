#[derive(Debug, Clone, Default)]
pub struct Calculator;

impl Calculator {
    pub fn new() -> Self { Calculator }
    pub fn add(&self, a: i32, b: i32) -> i32 { a + b }
}
