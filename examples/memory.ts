import MemoryPouch from '../modules/pouchdb_adapter_memory/mod.ts'
import PouchDB from '../modules/pouchdb/mod.ts'

PouchDB.plugin(MemoryPouch)

const db = new PouchDB('mydb', { adapter: 'memory' })
const doc = { hello: 'world' }
const result = await db.post(doc)

console.log(result)

const getDoc = await db.get(result.id)

console.log(getDoc)

const docs = await db.allDocs()

console.log(docs)
