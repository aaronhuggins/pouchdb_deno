import { configureSQLiteDB, createIndexedDB } from './lib/shim.ts'

configureSQLiteDB({ memory: true })
const indexedDB = createIndexedDB()

export {
  indexedDB
}
