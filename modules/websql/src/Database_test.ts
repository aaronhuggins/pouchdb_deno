import { assertEquals, assertRejects } from '../dev_deps.ts'
import { Database, openDatabase, configureSQLiteDB } from './Database.ts'
import { SQLTransaction } from './SQLTransaction.ts'

async function tx(txFunc: Database['transaction'], withSuccess = false) {
  return await new Promise<SQLTransaction | boolean>((resolve, reject) => {
    const successCallback = withSuccess
      ? () => resolve(true)
      : undefined
    txFunc(
      (tx) => {
        if (withSuccess) return
        resolve(tx)
      },
      (error) => reject(error),
      successCallback
    )
  })
}

async function innerErrorTx(txFunc: Database['transaction']) {
  return await new Promise<SQLTransaction | boolean>((_resolve, reject) => {
    txFunc(
      (_tx) => {
        throw new Error('FAKE')
      },
      (error) => reject(error)
    )
  })
}

async function changeVersionTx(db: Database, oldVersion: string, newVersion: string) {
  return await new Promise<SQLTransaction | undefined>((resolve, reject) => {
    db.changeVersion(
      oldVersion,
      newVersion,
      (tx) => resolve(tx),
      (error) => reject(error)
    )
  })
}

Deno.test('Database', async ({ step }) => {
  let database: Database

  await step('should modify and return SQLite options', () => {
    const opts1 = configureSQLiteDB({ memory: false })
    const opts2 = configureSQLiteDB({ memory: true })

    assertEquals(opts1.memory, false)
    assertEquals(opts2.memory, true)
  })

  await step('should open an instance', () => {
    database = openDatabase('mytest.db', '1', 'mytest', 1024)

    assertEquals(database instanceof Database, true)
  })

  await step('version should equal 1', () => {
    assertEquals(database.version, '1')
  })

  await step('should return a read/write transaction', async () => {
    const transaction = await tx(database.transaction.bind(database))

    assertEquals(transaction instanceof SQLTransaction, true)
  })

  await step('should return a read-only transaction', async () => {
    const transaction = await tx(database.readTransaction.bind(database))

    assertEquals(transaction instanceof SQLTransaction, true)
  })

  await step('should call the success callback', async () => {
    const transaction = await tx(database.transaction.bind(database), true)

    assertEquals(transaction, true)
  })

  await step('should change version to 3', () => {
    database.changeVersion('1', '3')

    assertEquals(database.version, '3')
  })

  await step('should change version to 4 with transaction', async () => {
    const transaction = await changeVersionTx(database, '3', '4')

    assertEquals(database.version, '4')
    assertEquals(transaction instanceof SQLTransaction, true)
  })

  await step('should throw error in inner transaction callback', async () => {
    await assertRejects(async () => {
      await innerErrorTx(database.transaction.bind(database))
    })
  })

  await step('should throw error for misconfiguration', async () => {
    configureSQLiteDB({ memory: false })
    const db = new Database('bad.db', '1', '', 2048)
    await assertRejects(async () => {
      await tx(db.readTransaction.bind(db))
    })
  })
})
