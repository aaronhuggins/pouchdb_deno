import './lib/indexeddb_global.ts'
import { configureSQLiteDB, createIndexedDB } from './lib/shim.ts'

configureSQLiteDB({ memory: true })
createIndexedDB(true)
