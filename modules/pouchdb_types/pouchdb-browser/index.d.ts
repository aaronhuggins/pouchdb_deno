// Type definitions for pouchdb-browser 6.1
// Project: https://pouchdb.com/, https://github.com/pouchdb/pouchdb
// Definitions by: Simon Paulger <https://github.com/spaulg>, Brian Geppert <https://github.com/geppy>, Frederico Galvão <https://github.com/fredgalvao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/// <reference types="../pouchdb-core/index.d.ts" />
/// <reference types="../pouchdb-adapter-idb/index.d.ts" />
/// <reference types="../pouchdb-adapter-websql/index.d.ts" />
/// <reference types="../pouchdb-adapter-http/index.d.ts" />
/// <reference types="../pouchdb-mapreduce/index.d.ts" />
/// <reference types="../pouchdb-replication/index.d.ts" />

declare const PouchDb: PouchDB.Static;
export = PouchDb;
