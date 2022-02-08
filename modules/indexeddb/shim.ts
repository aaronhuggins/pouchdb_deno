// deno-lint-ignore-file no-explicit-any
import type { IDBFactory } from './types/indexeddb.ts'
import 'https://cdn.skypack.dev/regenerator-runtime@0.13.9'
import indexeddbshim from 'https://cdn.skypack.dev/indexeddbshim@v9.0.0/dist/indexeddbshim-noninvasive.js'
import { openDatabase, configureSQLiteDB } from '../websql/mod.ts'

interface IDBShim {
  readonly shimIndexedDB: {
    __useShim: () => void
  }
  indexedDB: IDBFactory
}

const setGlobalVars = indexeddbshim as (...args: any[]) => IDBShim

function createIndexedDB (makeGlobal = false): IDBFactory {
  const kludge = makeGlobal ? null : { shimIndexedDB: {} }
  const idb = setGlobalVars(kludge, {
    avoidAutoShim: !makeGlobal,
    checkOrigin: false,
    win: { openDatabase }
  })

  if (!makeGlobal) idb.shimIndexedDB.__useShim()

  return idb.indexedDB
}

export {
  createIndexedDB,
  configureSQLiteDB
}
