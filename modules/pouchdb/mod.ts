/// <reference path="../pouchdb_types/pouchdb-core/index.d.ts" />
import PouchDB from 'https://cdn.skypack.dev/pouchdb-core@7.2.2'
import HttpPouch from 'https://cdn.skypack.dev/pouchdb-adapter-http@7.2.2'
import mapreduce from 'https://cdn.skypack.dev/pouchdb-mapreduce@7.2.2'
import replication from 'https://cdn.skypack.dev/pouchdb-replication@7.2.2'

PouchDB.plugin(HttpPouch)
  .plugin(mapreduce)
  .plugin(replication)

export default PouchDB
