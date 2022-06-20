import PouchDBImpl from "https://cdn.skypack.dev/pin/pouchdb-core@v7.3.0-89HuCNEcWBT7jv1msAf2/mode=imports/optimized/pouchdb-core.js";
import HttpPouch from "https://cdn.skypack.dev/pin/pouchdb-adapter-http@v7.3.0-wNzBHi1B5WLNzMPlTnWb/mode=imports/optimized/pouchdb-adapter-http.js";
import mapreduce from "https://cdn.skypack.dev/pin/pouchdb-mapreduce@v7.3.0-IEG2Gq1jfS0hW8QXVXqd/mode=imports/optimized/pouchdb-mapreduce.js";
import replication from "https://cdn.skypack.dev/pin/pouchdb-replication@v7.3.0-1sg1NWcwDf6gKFeXsMmq/mode=imports/optimized/pouchdb-replication.js";
import IDBPouch from "../pouchdb_adapter_idb/mod.ts";
import MemoryPouch from "../pouchdb_adapter_memory/mod.ts";
import IndexedDBPouch from "../pouchdb_adapter_indexeddb/mod.ts";
import find from "../pouchdb_plugin_find/mod.ts";
import type { PouchDB } from "../pouchdb_types/pouchdb.ts";

// deno-lint-ignore no-explicit-any
const PouchDBDeno: PouchDB.Static = PouchDBImpl as any;

PouchDBDeno.plugin(IDBPouch)
  .plugin(HttpPouch)
  .plugin(MemoryPouch)
  .plugin(IndexedDBPouch)
  .plugin(find)
  .plugin(mapreduce)
  .plugin(replication);

export default PouchDBDeno;
export type { PouchDB };
