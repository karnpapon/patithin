extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

// Reverse a string coming from JS 
#[wasm_bindgen]
pub fn reverse(s: String) -> String {
    s.chars().rev().collect::<String>()
}

#[wasm_bindgen]
pub fn adding(a: i32, b: i32) -> i32 {
    a + b
}


#[wasm_bindgen]
pub fn hello_rust() -> String {
    String::from("hello from rust")
}
