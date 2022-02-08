import { configureSQLiteDB, createIndexedDB } from './lib/shim.ts'

configureSQLiteDB({ memory: false })
const indexedDB = createIndexedDB()

export {
  indexedDB
}
