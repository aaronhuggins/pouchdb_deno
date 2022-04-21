# PouchDB for Deno

[PouchDB](https://github.com/pouchdb/pouchdb) for Deno, leveraging polyfill for
[IndexedDB based on SQLite](https://github.com/aaronhuggins/indexeddb).

## Usage

```typescript
import PouchDB from "https://deno.land/x/pouchdb_deno@v2.0.0-PouchDB+7.2.2/modules/pouchdb/mod.ts";

// Use the 'idb' afapter for IndexedDB and persistence to disk.
const db = new PouchDB("mydb", { adapter: "idb" });
const doc = { hello: "world" };
const result = await db.post(doc);

console.log(result);

const getDoc = await db.get(result.id);

console.log(getDoc);

const docs = await db.allDocs();

console.log(docs);
```

## Features

All working plugins are included in the main export of PouchDB for Deno.

**Out-of-the-box:**

- PouchDB-core imports into Deno without issue
- HTTP/S instances appear to work using PouchDB-Server using the http plugin
- PouchDB-Find plugin
- PouchDB-MapReduce plugin
- Replication

**With work-arounds:**

- PouchDB-Adapter-IndexedDB
- PouchDB-Adapter-Memory

## Documentation

Nearly all documentation at [PouchDB.com](https://pouchdb.com/) applies to this
library. Known differences are called out below.

### Adapters

Currently, the only adapters known to work in Deno are bootstrapped in this
repository. However, new adapters written from scratch targeting Deno _should_
work out-of-the-box when calling `PouchDB.plugin`. If new adapters written for
Deno do not work, file issues and make sure to cross-link them in this repo and
at [PouchDB's repo](https://github.com/pouchdb/pouchdb/issues).

### IndexedDB

All options work as documented by the PouchDB, with two subtle differences and a
new option just for Deno. This applies to both `adapter: "idb"` and
`adapter: "indexeddb"`.

- Database names are not prefixed with `_pouch_` in Deno like they are on web
- `prefix`: Takes a string argument, and can be used exactly like the LevelDB
  adapter to provide a directory for the database(s); **trailing slash is
  required**
- `systemPath` (Deno-specific flag): The IndexedDB implementation (see below)
  uses a "system" database `__sysdb__` for metadata about databases; supply a
  path to store this database in a custom directory

Since Deno does not ship with an official IndexedDB interface, it must be
polyfilled for the related PouchDB adapter to work.
[IndexedDBShim](https://github.com/indexeddbshim/IndexedDBShim) makes this
possible, on top of a WebSQL ponyfill written specifically for this codebase.

Should Deno ever
[implement this feature natively](https://github.com/denoland/deno/issues/1699),
the polyfill will be dropped to improve performance.

### LevelDOWN

The only PouchDB adapter based on LevelDOWN known to work is the memory adapter.
Local storage leveldown was tested and found to be incompatible. Other adapters
threw errors from Skypack.dev CDN import; the message reported related to an
out-of-date version of `readable-stream` NPM module.

### Types

Augmentation was extremely difficult to perform by directly referencing PouchDB
types from the DefinitelyTyped project. Instead, the relevant types were copied
from DefinitelyTyped and merged by hand.

## Why?

[I did this because I love PouchDB, thought I could get PouchDB working, and I was impatient.](https://github.com/pouchdb/pouchdb/issues/8158)

![Thanos picks up Infinity Gauntlet; says "Fine, I'll do it myself."](https://thumbs.gfycat.com/BogusForsakenAsianlion-size_restricted.gif)
