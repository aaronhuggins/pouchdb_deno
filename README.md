## PouchDB for Deno

PouchDB for Deno, leveraging polyfill for IndexedDB based on SQLite.

## Challenges

- LevelDOWN adapters use out-of-date readable-stream libraries which do not work in Deno
- Complexity of writing adapters
- IndexedDB and WebSQL do not exist in Deno (and only IndexedDB will be supported in the future)

## What works

**Out-of-the-box (and included in PouchDB for Deno) :**

- PouchDB-core imports into Deno without issue
- HTTP/S instances appear to work using PouchDB-Server using the http plugin
- PouchDB-Find plugin
- PouchDB-MapReduce plugin

**With work-arounds (only some parts included by default)**

- PouchDB-Adapter-IndexedDB (included in PouchdB for Deno)
- PouchDB-Adapter-Memory

## Plan

- [x] Export PouchDB and types
- [x] Add WebSQL ponyfill
- [x] Add IndexedDB polyfill on top of WebSQL
- [x] Port IndexedDB PouchDB adapter
- [x] Add in-memory adapter
- [x] Add examples
- [ ] Add tests
- [ ] Complete docs
- [ ] Figure out versioning
