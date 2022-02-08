import { configureSQLiteDB, createIndexedDB } from './shim.ts'

configureSQLiteDB({ memory: false })
const indexedDB = createIndexedDB()

export {
  indexedDB
}
