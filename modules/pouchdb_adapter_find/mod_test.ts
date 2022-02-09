import { assertEquals } from 'https://deno.land/std@0.125.0/testing/asserts.ts'
import FindPlugin from './mod.ts'

Deno.test('FindPlugin', () => {
  assertEquals(typeof FindPlugin, 'object')
})
