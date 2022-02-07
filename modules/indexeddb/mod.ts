// deno-lint-ignore-file no-explicit-any
import './indexeddb_globals.ts'
import 'https://cdn.skypack.dev/regenerator-runtime@0.13.9'
import indexeddbshim from 'https://cdn.skypack.dev/indexeddbshim@v9.0.0/dist/indexeddbshim-noninvasive.js'
import { openDatabase, configureSQLiteDB } from '../websql/mod.ts'

const setGlobalVars = indexeddbshim as (...args: any[]) => void

function createIndexedDB (): IDBFactory {
  setGlobalVars(null, {
    checkOrigin: false,
    win: { openDatabase }
  })

  return indexedDB
}

export {
  createIndexedDB,
  configureSQLiteDB
}
