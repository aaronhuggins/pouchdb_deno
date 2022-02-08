import './types/indexeddb_global.ts'
import { configureSQLiteDB, createIndexedDB } from './shim.ts'

configureSQLiteDB({ memory: true })
createIndexedDB(true)
