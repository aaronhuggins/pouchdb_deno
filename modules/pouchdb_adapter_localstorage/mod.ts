// deno-lint-ignore-file no-explicit-any
/// <reference path="../pouchdb_types/pouchdb-adapter-localstorage/index.d.ts" />
import CoreLevelPouch from 'https://cdn.skypack.dev/pouchdb-adapter-leveldb-core@7.2.2'
import { LocalStorageDown } from '../localstorage_down/mod.ts'

function localstoragedown (name: string) {
  return new LocalStorageDown(name)
}

function LocalStoragePouch (this: any, opts: unknown, callback: () => void) {
  const _opts = Object.assign({
    db: localstoragedown
  }, opts)

  CoreLevelPouch.call(this, _opts, callback)
}

LocalStoragePouch.valid = function () {
  return typeof localStorage !== 'undefined'
}

LocalStoragePouch.use_prefix = true

export default function localStorageAdapter (PouchDB: PouchDB.Static) {
  // Force use of adapter since it is a method hidden from the public types.
  (PouchDB as unknown as any).adapter('localstorage', LocalStoragePouch, true)
}
