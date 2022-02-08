import { capturePlugin } from '../pouchdb_deno_utils/capturePlugin.ts'
/// <reference path="../pouchdb_types/pouchdb-core/index.d.ts" />
import 'https://cdn.skypack.dev/pouchdb@7.2.2/dist/pouchdb.memory.js'

// Because we're using the vanilla browser export, the Memory plugin expects
// a PouchDB global. Function capturePlugin fakes the global and capture the
// passed plugin for use later with real PouchDB for Deno.
// deno-lint-ignore no-explicit-any
const MemoryPouchDeno: (pouchDb: any) => void = capturePlugin('MemoryPouchPlugin')

export default MemoryPouchDeno
