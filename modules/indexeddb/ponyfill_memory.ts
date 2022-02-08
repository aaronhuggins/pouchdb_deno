import { configureSQLiteDB, createIndexedDB } from './shim.ts'

configureSQLiteDB({ memory: true })
const indexedDB = createIndexedDB()

export {
  indexedDB
}
