# Rust WebAssembly building guild

## installation
- `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh` -> install new

if already had Rust run

- `rustup update && cargo update`   -> for updating
- `cargo install wasm-bindgen-cli`

## building

- `cargo build —target wasm32-unknown-unknown`  -> unknown = to working on any hardware / OS
- `wasm-bindgen target/wasm32-unknown-unknown/debug/rust_binding_lib.wasm —out-dir .`

or
- `cd target/wasm32-unknown-unknown/debug`  -> cd to target folder
- `wasm-bindgen rust_binding_lib.wasm —out-dir <directory>`  -> build wasm file outputting it to directory.


