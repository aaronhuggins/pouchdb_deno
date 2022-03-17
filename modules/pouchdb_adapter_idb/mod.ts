import 'https://deno.land/x/indexeddb@v1.1.0/polyfill.ts'
import IDBPouchImpl from 'https://cdn.skypack.dev/pin/pouchdb-adapter-idb@v7.2.2-en9WxKy5vepCFPLf3Coc/mode=imports/optimized/pouchdb-adapter-idb.js'
import type { PouchDB } from '../pouchdb_types/pouchdb.ts'

const IDBPouchDeno: (pouchDb: PouchDB.Static) => void = IDBPouchImpl

export default IDBPouchDeno
