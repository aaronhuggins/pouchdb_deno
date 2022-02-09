# IndexedDB for Deno

A strongly-typed wrapper of [non-invasive IndexedDBShim v9.0.0](https://github.com/indexeddbshim/IndexedDBShim) to provide IndexedDB either as a ponyfill, or as polyfill in the globalThis scope.

## Usage

Ponyfill is the recommended module type, as this allows the use of IndexedDB without mutating the global scope. Only use polyfill if you need `indexedDB` in the global scope, such as importing external modules into your project which expect it to be available globally.

### Ponyfill

**Persistent**
```javascript
import { indexedDB } from './indexeddb/ponyfill.ts'
```

**In-memory**
```javascript
import { indexedDB } from './indexeddb/ponyfill_memory.ts'
```

### Polyfill

Polyfill modules will add `indexedDB` to globalThis, and declare `indexedDB` and interface `IDBFactory` in the global type scope.

**Persistent**
```javascript
import './indexeddb/polyfill.ts'
```

**In-memory**
```javascript
import './indexeddb/polyfill_memory.ts'
```

## Documentation

Please [see Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/indexedDB) for complete documentation; keep in mind that sync operations are not supported.

## How it works

This library wraps IndexedDBShim into a callable function with work-arounds to prevent the shim from being added to the global scope. A WebSQL ponyfill is passed to the shim code and acts as the underlying SQLite API for IndexedDB.

Types are taken almost verbatim from [TypeScript DOM lib](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts); however, the real polyfilled objects and classes are not available until `createIndexedDB` is called, and then only if polyfilled.

A note if using `shim.ts` directly; the wrapper creates WebSQL instances in-memory by default. Before calling `createIndexedDB`, call `configureSQLiteDB` with the `memory: false` option to persist to disk.
