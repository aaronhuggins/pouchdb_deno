// deno-lint-ignore-file no-explicit-any
import "https://deno.land/x/indexeddb@1.3.3/polyfill.ts";
import { createIndexedDB } from "https://deno.land/x/indexeddb@1.3.3/lib/shim.ts";
import { capturePlugin } from "../pouchdb_deno_utils/capture_plugin.ts";
import "https://cdn.skypack.dev/pin/pouchdb@v7.3.0-bcA2ZAvx5a5vy7YRYZRz/mode=imports/unoptimized/dist/pouchdb.indexeddb.js";
import type { PouchDB } from "../pouchdb_types/pouchdb.ts";

type IndexedDBSignature = ((opts: any, cb: any) => void) & {
  valid: () => boolean;
  use_prefix: boolean;
};

// Because we're using the vanilla browser export, the IndexedDB plugin expects
// a PouchDB global. Function capturePlugin fakes the global and capture the
// passed plugin for use later with real PouchDB for Deno.
const IndexedDBPouchDeno: (pouchDb: PouchDB.Static) => void = capturePlugin(
  "IndexeddbPouchPlugin",
);
let hasIndexedDB = false;

function IndexedDBDenoWrapper(pouchDb: PouchDB.Static): void {
  IndexedDBPouchDeno(pouchDb);

  const adapterIndexedDB: IndexedDBSignature =
    (pouchDb as any).adapters.indexeddb;
  const validIndexedDB = adapterIndexedDB.valid;

  adapterIndexedDB.use_prefix = false;

  function indexeddb(
    this: any,
    opts: PouchDB.IdbAdapter.IdbAdapterConfiguration,
    callback: any,
  ) {
    if (!hasIndexedDB) {
      // Check for system path
      if (opts && typeof opts.systemPath === "string") {
        createIndexedDB(true, false, opts.systemPath);
      } else {
        createIndexedDB(true, false);
      }
      hasIndexedDB = true;
    }
    adapterIndexedDB.call(this, opts, callback);
  }

  indexeddb.valid = validIndexedDB;
  indexeddb.use_prefix = adapterIndexedDB.use_prefix;
  (pouchDb as any).adapters.indexeddb = indexeddb;
}

export default IndexedDBDenoWrapper;
