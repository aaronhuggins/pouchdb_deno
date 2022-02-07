import PouchDB from '../modules/pouchdb/mod.ts'

const db = new PouchDB('mydb', { adapter: 'idb' })
const doc = { hello: 'world' }
const result = await db.post(doc)

console.log(result)

const getDoc = await db.get(result.id)

console.log(getDoc)

const docs = await db.allDocs()

console.log(docs)
