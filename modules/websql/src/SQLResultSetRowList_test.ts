import { assertEquals } from '../dev_deps.ts'
import { SQLResultSetRowList } from './SQLResultSetRowList.ts'

Deno.test('SQLResultSetRowList', async ({ step }) => {
  const data = [
    { hello: 'world' },
    { hello: 'dollie' }
  ]
  let rowList: SQLResultSetRowList<typeof data[0]>

  await step('construct an instance with no data', () => {
    rowList = new SQLResultSetRowList()

    assertEquals(rowList instanceof SQLResultSetRowList, true)
  })

  await step('construct an instance with data', () => {
    rowList = new SQLResultSetRowList(data)

    assertEquals(rowList instanceof SQLResultSetRowList, true)
  })

  await step('row list has length equal to sample data', () => {
    assertEquals(rowList.length, data.length)
  })

  await step('row list returns element equal to elemnt in sample data', () => {
    assertEquals(rowList.item(0), data[0])
    assertEquals(rowList.item(1), data[1])
  })
})
