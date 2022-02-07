import { createIndexedDB, configureSQLiteDB } from '../indexeddb/mod.ts'
/// <reference path="../pouchdb_types/pouchdb-adapter-idb/index.d.ts" />
import IDBPouchImpl from 'https://cdn.skypack.dev/pouchdb-adapter-idb@v7.2.2'

configureSQLiteDB({ memory: false })
createIndexedDB()

const IDBPouchDeno: (pouchDb: PouchDB.Static) => void = IDBPouchImpl

export default IDBPouchDeno
