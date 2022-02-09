import PouchDB from 'https://deno.land/x/pouchdb_deno@v1.0.0-PouchDB+7.2.2/modules/pouchdb/mod.ts'

const db = new PouchDB('mydb', { adapter: 'idb' })
const doc = { hello: 'world' }
const result = await db.post(doc)

console.log(result)

const getDoc = await db.get(result.id)

console.log(getDoc)

const docs = await db.allDocs()

console.log(docs)
