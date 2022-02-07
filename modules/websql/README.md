# WebSQL Ponyfill

A complete rewrite of [Philzen/WebSQL-Polyfill](https://github.com/Philzen/WebSQL-Polyfill), using [dyedgreen/deno-sqlite](https://github.com/dyedgreen/deno-sqlite) as the sql engine.

The ponyfill creates WebSQL isntances in-memory by default; call `configureSQLiteDB` with the `memory: false` option to persist to disk.