import PouchDBImpl from 'https://cdn.skypack.dev/pin/pouchdb-core@v7.2.2-6nfR7P1D7GA03jBaX1mS/mode=imports/optimized/pouchdb-core.js'
import HttpPouch from 'https://cdn.skypack.dev/pin/pouchdb-adapter-http@v7.2.2-y4aebSvW9D9JkNygjYmK/mode=imports/optimized/pouchdb-adapter-http.js'
import mapreduce from 'https://cdn.skypack.dev/pin/pouchdb-mapreduce@v7.2.2-kxv4D1wbAjwMDTO3agZu/mode=imports/optimized/pouchdb-mapreduce.js'
import replication from 'https://cdn.skypack.dev/pin/pouchdb-replication@v7.2.2-Xl6mE36Cc622eXxmQskd/mode=imports/optimized/pouchdb-replication.js'
import IDBPouch from '../pouchdb_adapter_idb/mod.ts'
import MemoryPouch from '../pouchdb_adapter_memory/mod.ts'
import find from '../pouchdb_adapter_find/mod.ts'
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
