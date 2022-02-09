import 'https://deno.land/x/indexeddb@v1.0.0/polyfill.ts'
import IDBPouchImpl from 'https://cdn.skypack.dev/pouchdb-adapter-idb@v7.2.2'
import type { PouchDB } from '../pouchdb_types/pouchdb.ts'

const IDBPouchDeno: (pouchDb: PouchDB.Static) => void = IDBPouchImpl

export default IDBPouchDeno
