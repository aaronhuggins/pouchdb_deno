import PouchDBImpl from 'https://cdn.skypack.dev/pin/pouchdb-core@v7.2.2-6nfR7P1D7GA03jBaX1mS/mode=imports/optimized/pouchdb-core.js'
import HttpPouch from 'https://cdn.skypack.dev/pouchdb-adapter-http@7.2.2'
import find from 'https://cdn.skypack.dev/pouchdb-find@7.2.2'
import mapreduce from 'https://cdn.skypack.dev/pouchdb-mapreduce@7.2.2'
import replication from 'https://cdn.skypack.dev/pouchdb-replication@7.2.2'
import IDBPouch from '../pouchdb_adapter_idb/mod.ts'
import MemoryPouch from '../pouchdb_adapter_memory/mod.ts'
import type { PouchDB } from '../pouchdb_types/pouchdb.ts'

// deno-lint-ignore no-explicit-any
const PouchDBDeno: PouchDB.Static = PouchDBImpl as any

PouchDBDeno.plugin(IDBPouch)
  .plugin(HttpPouch)
  .plugin(MemoryPouch)
  .plugin(find)
  .plugin(mapreduce)
  .plugin(replication)

export default PouchDBDeno
