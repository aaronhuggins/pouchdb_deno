// deno-lint-ignore-file no-explicit-any
import { SQLResultSetRowList } from './SQLResultSetRowList.ts'

export class SQLResultSet<T = any> {
  #insertId?: number
  #rowsAffected?: number
  #rows: SQLResultSetRowList<T>

  constructor (rows?: SQLResultSetRowList<T>, insertId?: number, rowsAffected?: number) {
    this.#insertId = insertId
    this.#rowsAffected = rowsAffected
    this.#rows = typeof rows === 'undefined' ? new SQLResultSetRowList() : rows
  }

  get insertId (): number {
    if (this.#insertId) return this.#insertId

    throw new Error('INVALID_ACCESS_ERR')
  }

  get rowsAffected (): number {
    return this.#rowsAffected ?? 0
  }

  get rows (): SQLResultSetRowList<T> {
    return this.#rows
  }
}
