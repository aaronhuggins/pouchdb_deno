## PouchDB for Deno

Port and/or export PouchDB for use with Deno.

## Challenges

- LevelDOWN adapters use out-of-date readable-stream libraries which do not work in Deno
- Complexity of writing adapters
- IndexedDB and WebSQL do not exist in Deno (and only IndexedDB will be supported in the future)
- In-memory and local storage adapters depend on PouchDB's implementation of LevelDOWN

## What works

- PouchDB-core imports into Deno without issue
- HTTP/S instances appear to work using PouchDB-Server using the http plugin
- PouchDB-Find plugin
- PouchDB-MapReduce plugin

## Plan

- [x] Export PouchDB and types
- [x] Add WebSQL ponyfill
- [ ] Add tests for WebSQL polyfill
- [x] Add IndexedDB polyfill on top of WebSQL
- [ ] ?? Port WebSQL PouchDB adapter
- [ ] Port IndexedDB PouchDB adapter (best path, probably means continued maintenance from PouchDB team)
- [ ] Add in-memory adapter, using WebSQL polyfill with memory-only option

RESULT: Plan should end up with at least 1 adapter that persists to disk and 1 adapter which operates only in-memory.
