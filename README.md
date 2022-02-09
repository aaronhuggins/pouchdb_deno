# PouchDB for Deno

[PouchDB](https://github.com/pouchdb/pouchdb) for Deno, leveraging polyfill for IndexedDB based on SQLite.

## Challenges

- LevelDOWN adapters use out-of-date readable-stream libraries which do not work in Deno
- Complexity of writing adapters
- IndexedDB and WebSQL do not exist in Deno (and only IndexedDB will be supported in the future)

## What works

All working plugins are included in PouchDB for Deno.

**Out-of-the-box:**

- PouchDB-core imports into Deno without issue
- HTTP/S instances appear to work using PouchDB-Server using the http plugin
- PouchDB-Find plugin
- PouchDB-MapReduce plugin
- Replication

**With work-arounds:**

- PouchDB-Adapter-IndexedDB
- PouchDB-Adapter-Memory

## Plan

- [x] Export PouchDB and types
- [x] Add WebSQL ponyfill
- [x] Add IndexedDB polyfill on top of WebSQL
- [x] Port IndexedDB PouchDB adapter
- [x] Add in-memory adapter
- [x] Add examples
- [x] Add tests [1](https://github.com/aaronhuggins/pouchdb_deno/issues/1)
- [ ] Complete docs [2](https://github.com/aaronhuggins/pouchdb_deno/issues/2)
- [ ] Figure out versioning; [discussion](https://github.com/aaronhuggins/pouchdb_deno/issues/3)

## Why?

[I did this because I love PouchDB, thought I could get PouchDB working, and I was impatient.](https://github.com/pouchdb/pouchdb/issues/8158)

![Thanos picks up Infinity Gauntlet; says "Fine, I'll do it myself."](https://thumbs.gfycat.com/BogusForsakenAsianlion-size_restricted.gif)
