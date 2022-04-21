// deno-lint-ignore-file no-explicit-any
import "https://deno.land/x/indexeddb@1.3.0/polyfill.ts";
import { createIndexedDB } from "https://deno.land/x/indexeddb@1.3.0/lib/shim.ts";
import IDBPouchImpl from "https://cdn.skypack.dev/pin/pouchdb-adapter-idb@v7.3.0-zIdGq675NuTdgkAjGFSh/mode=imports/optimized/pouchdb-adapter-idb.js";
import type { PouchDB } from "../pouchdb_types/pouchdb.ts";

type IDBSignature = ((opts: any, cb: any) => void) & {
  valid: () => boolean;
  use_prefix: boolean;
};

const IDBPouchDeno: (pouchDb: PouchDB.Static) => void = IDBPouchImpl;
let hasIndexedDB = false;

function IDBDenoWrapper(pouchDb: PouchDB.Static): void {
  IDBPouchDeno(pouchDb);

  const adapterIdb: IDBSignature = (pouchDb as any).adapters.idb;
  const validIdb = adapterIdb.valid;

  adapterIdb.use_prefix = false;

  function idb(
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
    adapterIdb.call(this, opts, callback);
  }

  idb.valid = validIdb;
  idb.use_prefix = adapterIdb.use_prefix;
  (pouchDb as any).adapters.idb = idb;
}

export default IDBDenoWrapper;
