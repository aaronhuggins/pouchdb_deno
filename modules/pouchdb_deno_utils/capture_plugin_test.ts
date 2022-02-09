import { assertEquals } from 'https://deno.land/std@0.125.0/testing/asserts.ts'
import { capturePlugin } from './capture_plugin.ts'

Deno.test('capturePlugin', async ({ step }) => {
  // deno-lint-ignore no-explicit-any
  const globalAnyRef: any = (globalThis as any)
  const fakePouch = function fakePouch () {}
  const { name } = fakePouch

  await step('should place fake PouchDB in global', () => {
    assertEquals(typeof globalAnyRef.PouchDB, 'object')
  })

  await step('plugin sink should cache plugin', () => {
    globalAnyRef.PouchDB.plugin(fakePouch)

    assertEquals(capturePlugin(name), fakePouch)
  })
})
