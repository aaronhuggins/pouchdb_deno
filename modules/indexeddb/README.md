# IndexedDB Polyfill

A wrapper of [non-invasive IndexedDBShim](https://github.com/indexeddbshim/IndexedDBShim) to provide IndexedDB in the globalThis scope.

Types are taken almost verbatim from [TypeScript DOM lib](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts); however, the real polyfilled objects and classes are not available until `createIndexedDB` is called.

The ponlfill creates WebSQL isntances in-memory by default; before calling `createIndexedDB`, call `configureSQLiteDB` with the `memory: false` option to persist to disk.
