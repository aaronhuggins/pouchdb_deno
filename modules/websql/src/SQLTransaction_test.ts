import { assertEquals, assertRejects } from '../dev_deps.ts'
import { SQLTransaction } from './SQLTransaction.ts'
import { SQLiteDB } from '../deps.ts'
import type { SQLResultSet } from './SQLResultSet.ts'

type ExecParams = Parameters<SQLTransaction['executeSql']>
async function executeSql (statement: ExecParams[0], args: ExecParams[1], transaction: SQLTransaction): Promise<SQLResultSet> {
  return await new Promise<SQLResultSet>((resolve, reject) => {
    transaction.executeSql(statement, args, (_tx, resultSet) => {
      resolve(resultSet)
    }, (_tx, error) => {
      reject(error)
      return !error
    })
  })
}

Deno.test('SQLTransaction', async ({ step }) => {
  const db = new SQLiteDB('test.db', { memory: true })
  let transaction: SQLTransaction

  await step('should construct an instance', () => {
    transaction = new SQLTransaction(db)

    assertEquals(transaction instanceof SQLTransaction, true)
  })

  await step('should create a table', async () => {
    const statement = `CREATE TABLE IF NOT EXISTS test_table (
      row_id INTEGER PRIMARY KEY,
      hello TEXT NOT NULL
    )`
    const resultSet = await executeSql(statement, {}, transaction)

    assertEquals(resultSet.rowsAffected, 0)
  })

  await step('should error if table exists', async () => {
    const statement = `CREATE TABLE test_table (
      row_id INTEGER PRIMARY KEY,
      hello TEXT NOT NULL
    )`

    await assertRejects(async () => {
      const resultSet = await executeSql(statement, {}, transaction)

      assertEquals(resultSet.rowsAffected, 0)
    })
  })

  await step('should insert a row', async () => {
    const statement = `INSERT INTO test_table (hello) VALUES (?)`
    const resultSet = await executeSql(statement, ['world'], transaction)

    assertEquals(resultSet.rowsAffected, 1)
  })
})
