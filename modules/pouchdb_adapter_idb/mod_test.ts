import { assertEquals } from 'https://deno.land/std@0.125.0/testing/asserts.ts'
import IDBPouch from './mod.ts'

Deno.test('IDBPouch', () => {
  assertEquals(typeof IDBPouch, 'function')
})
