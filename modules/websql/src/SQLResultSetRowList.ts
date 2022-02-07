// deno-lint-ignore-file no-explicit-any
export class SQLResultSetRowList<T = any> {
  #rows: T[]

  constructor (data?: T[]) {
    this.#rows = Array.isArray(data) ? data : []
  }

  get length (): number {
    return this.#rows.length
  }

  item (index: number): T {
    return this.#rows[index]
  }
}
