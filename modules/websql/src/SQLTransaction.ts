// deno-lint-ignore-file no-explicit-any
import { SQLResultSet } from './SQLResultSet.ts'
import { SQLResultSetRowList } from './SQLResultSetRowList.ts'
import type { SQLiteDB } from '../deps.ts'

export class SQLTransaction<T = any> {
  #db: SQLiteDB

  constructor (db: SQLiteDB) {
    this.#db = db
  }

  executeSql (sqlStatement: string, args: ObjectArray, callback: SQLStatementCallback<T>, errorCallback?: SQLStatementErrorCallback<T>) {
    queueMicrotask(() => {
      try {
        const data: any[] = this.#db.queryEntries(sqlStatement, args)
        const { lastInsertRowId: insertId, changes } = this.#db
        const resultSet = new SQLResultSet<T>(new SQLResultSetRowList<T>(data), insertId, changes)
        queueMicrotask(() => {
          callback(this, resultSet)
        })
      } catch (error) {
        queueMicrotask(() => {
          if (errorCallback) errorCallback(this, error)
        })
      }
    })
  }
}

export type QueryParameter =
  | boolean
  | number
  | bigint
  | string
  | null
  | undefined
  | Date
  | Uint8Array
export type ObjectArray = Record<string, QueryParameter> | Array<QueryParameter>

interface SQLStatementCallback<T = any> {
  (transaction: SQLTransaction<T>, resultSet: SQLResultSet): void
}

interface SQLStatementErrorCallback<T = any> {
  (transaction: SQLTransaction<T>, error: Error): boolean
}
