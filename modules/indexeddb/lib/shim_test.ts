// deno-lint-ignore-file
import { assertEquals } from 'https://deno.land/std@0.125.0/testing/asserts.ts'
import { configureSQLiteDB, createIndexedDB } from './shim.ts'

Deno.test('createIndexedDB', async ({ step }) => {
  configureSQLiteDB({ memory: true })

  await step('should return IDBFactory', () => {
    const idb = createIndexedDB()

    assertEquals(typeof idb.open, 'function')
  })

  await step('should add indexedDB to the global scope', () => {
    createIndexedDB(true)

    assertEquals(typeof (globalThis as any).indexedDB, 'object')
    assertEquals(typeof (globalThis as any).indexedDB.open, 'function')
  })
})
