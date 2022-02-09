# WebSQL for Deno

A ponyfill of WebSQL which provides a complete async interface for Deno.

## Usage

Import the ponyfill and use just like the spec.

```typescript
import { openDatabase, configureSQLiteDB } from 'websql/mod.ts'

configureSQLiteDB({ memory: false }) // Optional; required for persistence, defaults to memory: true

const db = openDatabase('myawesome.db', '1.0', 'MyAwesomeDB', 0)
```

## Documentation

Please [see the spec](https://www.w3.org/TR/webdatabase/#sql) for complete documentation; keep in mind that sync operations are not supported.

## What is it?

A complete rewrite of [Philzen/WebSQL-Polyfill](https://github.com/Philzen/WebSQL-Polyfill), using [dyedgreen/deno-sqlite](https://github.com/dyedgreen/deno-sqlite) as the sql engine.

The ponyfill creates WebSQL isntances in-memory by default; call `configureSQLiteDB` with the `memory: false` option to persist to disk.
