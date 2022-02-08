import { assertEquals, assertThrows } from '../dev_deps.ts'
import { SQLResultSetRowList } from './SQLResultSetRowList.ts'
import { SQLResultSet } from './SQLResultSet.ts'

Deno.test('SQLResultSet', async ({ step }) => {
  const rowList = new SQLResultSetRowList([
    { hello: 'world' },
    { hello: 'dollie' }
  ])
  let resultSet: SQLResultSet

  await step('construct an instance with no rowList', () => {
    resultSet = new SQLResultSet()

    assertEquals(resultSet instanceof SQLResultSet, true)
  })

  await step('rows affected should equal 0', () => {
    assertEquals(resultSet.rowsAffected, 0)
  })

  await step('instance throws on undefined insert id', () => {
    assertThrows(() => {
      const id = resultSet.insertId

      assertEquals(id, undefined)
    })
  })

  await step('construct an instance with rowList', () => {
    resultSet = new SQLResultSet(rowList, 1, rowList.length)

    assertEquals(resultSet instanceof SQLResultSet, true)
  })

  await step('last insert id should equal 1', () => {
    assertEquals(resultSet.insertId, 1)
  })

  await step('rows affected should equal 2', () => {
    assertEquals(resultSet.rowsAffected, 2)
  })

  await step('rows should equal sample rowList', () => {
    assertEquals(resultSet.rows, rowList)
  })
})
