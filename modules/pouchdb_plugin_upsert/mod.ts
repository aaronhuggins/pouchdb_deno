// deno-lint-ignore-file ban-types no-explicit-any
import type { PouchDB } from "../pouchdb_types/pouchdb.ts";

type Document<Model> = PouchDB.Core.Document<{} & Model> & PouchDB.Core.GetMeta;
type DiffFunc<Model> = (doc: Document<Model>) => (Document<Model> | false);
type PouchDBCallback = PouchDB.Core.Callback<PouchDBUpsertResponse>;
type PouchDBUpsertResponse = PouchDB.Core.Response & {
  updated: boolean;
};

function upsertDocument<Model>(
  db: PouchDB.Database,
  docId: string,
  diffFunc: DiffFunc<Model>,
): Promise<PouchDBUpsertResponse> {
  if (typeof docId !== "string") {
    return Promise.reject(new Error("doc id is required"));
  }

  return db.get(docId).catch((error: any) => {
    if (error?.status !== 404) throw error;
    return {} as Document<Model>;
  }).then((doc) => {
    const docRevision = doc._rev;
    const newDocument = diffFunc(doc as Document<Model>);

    if (!newDocument) {
      return {
        updated: false,
        rev: docRevision,
        id: docId,
        ok: true,
      };
    }

    newDocument._id = docId;
    newDocument._rev = docRevision;

    return tryPutDocument(db, newDocument, diffFunc);
  });
}

function tryPutDocument<Model>(
  db: PouchDB.Database,
  doc: Document<Model>,
  diffFunc: DiffFunc<Model>,
): Promise<PouchDBUpsertResponse> {
  return db.put(doc).then(
    (response) => ({
      updated: true,
      rev: response.rev,
      id: doc._id,
      ok: response.ok,
    }),
    (error) => {
      if (error?.status !== 409) throw error;

      return upsertDocument(db, doc._id, diffFunc);
    },
  );
}

/** Perform an upsert of a document using a difference function to provide the upsert algorithm. */
function upsert<Model extends {} = {}>(
  this: PouchDB.Database,
  docId: string,
  diffFunc: DiffFunc<Model>,
): Promise<PouchDBUpsertResponse>;
function upsert<Model extends {} = {}>(
  this: PouchDB.Database,
  docId: string,
  diffFunc: DiffFunc<Model>,
  cb: PouchDBCallback,
): void;
function upsert<Model extends {} = {}>(
  this: PouchDB.Database,
  docId: string,
  diffFunc: DiffFunc<Model>,
  cb?: PouchDBCallback,
): Promise<PouchDBUpsertResponse> | void {
  const promise = upsertDocument(this, docId, diffFunc);
  if (typeof cb !== "function") return promise;
  promise.then((response): any => cb(null, response), cb as any);
}

/** Perform an upsert of a document using a shallow merge algorithm. Use `db.upsert` for more complex operations. */
function upsertAndMerge<Model extends {} = {}>(
  this: PouchDB.Database,
  doc: Document<Model>,
): Promise<PouchDBUpsertResponse>;
function upsertAndMerge<Model extends {} = {}>(
  this: PouchDB.Database,
  doc: Document<Model>,
  cb: PouchDBCallback,
): void;
function upsertAndMerge<Model extends {} = {}>(
  this: PouchDB.Database,
  doc: Document<Model>,
  cb?: PouchDBCallback,
): Promise<PouchDBUpsertResponse> | void {
  const promise = upsertDocument(this, doc._id, (existing) => ({
    ...existing,
    ...doc,
  }));
  if (typeof cb !== "function") return promise;
  promise.then((response): any => cb(null, response), cb as any);
}

/** Perform an upsert of a document with a simple replace if exists. Use `db.upsert` for more complex operations. */
function upsertAndReplace<Model extends {} = {}>(
  this: PouchDB.Database,
  doc: Document<Model>,
): Promise<PouchDBUpsertResponse>;
function upsertAndReplace<Model extends {} = {}>(
  this: PouchDB.Database,
  doc: Document<Model>,
  cb: PouchDBCallback,
): void;
function upsertAndReplace<Model extends {} = {}>(
  this: PouchDB.Database,
  doc: Document<Model>,
  cb?: PouchDBCallback,
): Promise<PouchDBUpsertResponse> | void {
  const promise = upsertDocument(this, doc._id, () => doc);
  if (typeof cb !== "function") return promise;
  promise.then((response): any => cb(null, response), cb as any);
}

/** Perform a put of a document only if the document does not already exist. */
function putIfNotExists<Model extends {} = {}>(
  this: PouchDB.Database,
  doc: Document<Model>,
): Promise<PouchDBUpsertResponse>;
function putIfNotExists<Model extends {} = {}>(
  this: PouchDB.Database,
  doc: Document<Model>,
  cb: PouchDBCallback,
): void;
function putIfNotExists<Model extends {} = {}>(
  this: PouchDB.Database,
  docId: string,
  doc: Document<Model>,
): Promise<PouchDBUpsertResponse>;
function putIfNotExists<Model extends {} = {}>(
  this: PouchDB.Database,
  docId: string,
  doc: Document<Model>,
  cb: PouchDBCallback,
): void;
function putIfNotExists<Model extends {} = {}>(
  this: PouchDB.Database,
  docId: string | Document<Model>,
  doc?: Document<Model> | PouchDBCallback,
  cb?: PouchDBCallback,
): Promise<PouchDBUpsertResponse> | void {
  if (typeof docId !== "string") {
    cb = doc as any;
    doc = docId;
    docId = doc._id;
  }

  const diffFunc = (existing: Document<Model>) => {
    if (existing._rev) return false;
    return doc as any;
  };
  const promise = upsertDocument(this, docId, diffFunc);
  if (typeof cb !== "function") return promise;
  promise.then(
    (response): any => (cb as PouchDBCallback)(null, response),
    cb as any,
  );
}

const UpsertPlugin = {
  upsert,
  upsertAndMerge,
  upsertAndReplace,
  putIfNotExists,
};

export default UpsertPlugin;
