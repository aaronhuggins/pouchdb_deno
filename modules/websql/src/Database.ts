// deno-lint-ignore-file no-explicit-any
import { SQLTransaction } from './SQLTransaction.ts'
import { SQLiteDB } from '../deps.ts'
import type { SqliteOptions } from '../deps.ts'

export class Database {
  #name: string
  #version: string
  #options: SqliteOptions

  constructor (name: string, version: string, _displayName: string, _estimatedSize: number) {
    this.#name = name
    this.#version = version
    this.#options = options
  }

  #doTransaction<T = any> (txMode: Exclude<SqliteOptions['mode'], undefined>, callback: TransactionCallback<T>, errorCallback?: (err: any) => any, successCallback?: () => any) {
    queueMicrotask(() => {
      try {
        const db = new SQLiteDB(this.#name, { ...this.#options, mode: txMode })
        const transaction = new SQLTransaction<T>(db)

        queueMicrotask(() => {
          try {
            callback(transaction)

            queueMicrotask(() => {
              if (successCallback) successCallback()
            })
          } catch (error) {
            if (errorCallback) errorCallback(error)
          }
        })
      } catch (error) {
        if (errorCallback) errorCallback(error)
      }
    })
  }

  transaction<T = any> (callback: TransactionCallback<T>, errorCallback?: (err: any) => any, successCallback?: () => any) {
    this.#doTransaction('create', callback, errorCallback, successCallback)
  }

  readTransaction<T = any> (callback: TransactionCallback<T>, errorCallback?: (err: any) => any, successCallback?: () => any) {
    this.#doTransaction('read', callback, errorCallback, successCallback)
  }

  get version (): string {
    return this.#version
  }

  changeVersion (oldVersion: string, newVersion: string, callback?: TransactionCallback, errorCallback?: (err: any) => any, successCallback?: () => any) {
    if (oldVersion === this.#version) {
      this.#version = newVersion
      if (callback) this.#doTransaction('write', callback, errorCallback, successCallback)
    }
  }
}

let options: SqliteOptions = {
  memory: true
}

/** Mutates module options for underlying SQLiteDB implementation, and returns a clone of existing options. */
export function configureSQLiteDB (customOptions: SqliteOptions = {}): SqliteOptions {
  options = {
    ...options,
    ...customOptions
  }

  return structuredClone(options)
}

/** Implements the openDatabase function per the WebSQL spec. */
export function openDatabase (name: string, version: string, displayName: string, estimatedSize: number) {
  return new Database(name, version, displayName, estimatedSize)
}

export type TransactionCallback<T = any> = (tx: SQLTransaction<T>) => any
