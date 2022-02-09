import '../indexeddb/polyfill.ts'
import IDBPouchImpl from 'https://cdn.skypack.dev/pouchdb-adapter-idb@v7.2.2'
import type { PouchDB } from '../pouchdb_types/pouchdb.ts'

const IDBPouchDeno: (pouchDb: PouchDB.Static) => void = IDBPouchImpl

export default IDBPouchDeno
