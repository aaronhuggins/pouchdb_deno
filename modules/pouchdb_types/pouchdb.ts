// deno-lint-ignore-file no-explicit-any ban-types
// Type definitions for pouchdb-core 7.0
// Project: https://pouchdb.com/, https://github.com/pouchdb/pouchdb
// Definitions by: Simon Paulger <https://github.com/spaulg>, Jakub Navratil <https://github.com/trubit>,
//                 Brian Geppert <https://github.com/geppy>, Frederico Galvão <https://github.com/fredgalvao>,
//                 Tobias Bales <https://github.com/TobiasBales>, Sebastián Ramírez <https://github.com/tiangolo>,
//                 Katy Moe <https://github.com/kmoe>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
import debug from "./debug.d.ts";

interface Blob {
  readonly size: number;
  readonly type: string;
  slice(start?: number, end?: number, contentType?: string): Blob;
}

interface Buffer extends Uint8Array {
  write(
    string: string,
    offset?: number,
    length?: number,
    encoding?: string,
  ): number;
  toString(encoding?: string, start?: number, end?: number): string;
  toJSON(): { type: "Buffer"; data: any[] };
  equals(otherBuffer: Buffer): boolean;
  compare(
    otherBuffer: Buffer,
    targetStart?: number,
    targetEnd?: number,
    sourceStart?: number,
    sourceEnd?: number,
  ): number;
  copy(
    targetBuffer: Buffer,
    targetStart?: number,
    sourceStart?: number,
    sourceEnd?: number,
  ): number;
  slice(start?: number, end?: number): Buffer;
  writeUIntLE(
    value: number,
    offset: number,
    byteLength: number,
    noAssert?: boolean,
  ): number;
  writeUIntBE(
    value: number,
    offset: number,
    byteLength: number,
    noAssert?: boolean,
  ): number;
  writeIntLE(
    value: number,
    offset: number,
    byteLength: number,
    noAssert?: boolean,
  ): number;
  writeIntBE(
    value: number,
    offset: number,
    byteLength: number,
    noAssert?: boolean,
  ): number;
  readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
  readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
  readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
  readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
  readUInt8(offset: number, noAssert?: boolean): number;
  readUInt16LE(offset: number, noAssert?: boolean): number;
  readUInt16BE(offset: number, noAssert?: boolean): number;
  readUInt32LE(offset: number, noAssert?: boolean): number;
  readUInt32BE(offset: number, noAssert?: boolean): number;
  readInt8(offset: number, noAssert?: boolean): number;
  readInt16LE(offset: number, noAssert?: boolean): number;
  readInt16BE(offset: number, noAssert?: boolean): number;
  readInt32LE(offset: number, noAssert?: boolean): number;
  readInt32BE(offset: number, noAssert?: boolean): number;
  readFloatLE(offset: number, noAssert?: boolean): number;
  readFloatBE(offset: number, noAssert?: boolean): number;
  readDoubleLE(offset: number, noAssert?: boolean): number;
  readDoubleBE(offset: number, noAssert?: boolean): number;
  swap16(): Buffer;
  swap32(): Buffer;
  swap64(): Buffer;
  writeUInt8(value: number, offset: number, noAssert?: boolean): number;
  writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
  writeInt8(value: number, offset: number, noAssert?: boolean): number;
  writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
  writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
  writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
  writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
  writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
  writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
  writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
  writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
  fill(value: any, offset?: number, end?: number): this;
  indexOf(
    value: string | number | Buffer,
    byteOffset?: number,
    encoding?: string,
  ): number;
  lastIndexOf(
    value: string | number | Buffer,
    byteOffset?: number,
    encoding?: string,
  ): number;
  entries(): IterableIterator<[number, number]>;
  includes(
    value: string | number | Buffer,
    byteOffset?: number,
    encoding?: string,
  ): boolean;
  keys(): IterableIterator<number>;
  values(): IterableIterator<number>;
}

interface EventEmitter {
  addListener(event: string | symbol, listener: Function): this;
  on(event: string | symbol, listener: Function): this;
  once(event: string | symbol, listener: Function): this;
  removeListener(event: string | symbol, listener: Function): this;
  removeAllListeners(event?: string | symbol): this;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  listeners(event: string | symbol): Function[];
  emit(event: string | symbol, ...args: any[]): boolean;
  listenerCount(type: string | symbol): number;
  prependListener(event: string | symbol, listener: Function): this;
  prependOnceListener(event: string | symbol, listener: Function): this;
  eventNames(): Array<string | symbol>;
}

type Fetch = (
  url: string | Request,
  opts?: RequestInit,
) => Promise<Response>;

export declare namespace PouchDB {
  namespace Core {
    interface Error {
      /**
       * HTTP Status Code during HTTP or HTTP-like operations
       */
      status?: number | undefined;
      name?: string | undefined;
      message?: string | undefined;
      reason?: string | undefined;
      error?: string | boolean | undefined;
      id?: string | undefined;
      rev?: RevisionId | undefined;
    }
    type Callback<R> = (error: Error | null, result: R | null) => void;
    type DocumentId = string;
    type DocumentKey = string;
    type AttachmentId = string;
    type RevisionId = string;
    type Availability = "available" | "compacted" | "not compacted" | "missing";
    type AttachmentData = string | Blob | Buffer;

    interface Options {
      fetch?: Fetch | undefined;
    }

    interface BasicResponse {
      /** `true` if the operation was successful; `false` otherwise */
      ok: boolean;
    }
    interface Response extends BasicResponse {
      /** id of the targeted document */
      id: DocumentId;
      /** resulting revision of the targeted document */
      rev: RevisionId;
    }

    interface DatabaseInfo {
      /** Name of the database you gave when you called new PouchDB(), and also the unique identifier for the database. */
      db_name: string;

      /** Total number of non-deleted documents in the database. */
      doc_count: number;

      /** Sequence number of the database. It starts at 0 and gets incremented every time a document is added or modified */
      update_seq: number | string;
    }

    interface Revision<Content extends {}> {
      ok: Document<Content> & RevisionIdMeta;
    }
    interface RevisionInfo {
      rev: RevisionId;
      status: Availability;
    }
    interface RevisionDiffOptions {
      [DocumentId: string]: string[];
    }
    interface RevisionDiff {
      missing?: string[] | undefined;
      possible_ancestors?: string[] | undefined;
    }
    interface RevisionDiffResponse {
      [DocumentId: string]: RevisionDiff;
    }

    interface IdMeta {
      _id: DocumentId;
    }
    interface RevisionIdMeta {
      _rev: RevisionId;
    }
    interface GetMeta {
      /**
       * Conflicting leaf revisions.
       *
       * Only present if `GetOptions.conflicts` is `true`
       */
      _conflicts?: RevisionId[] | undefined;
      _rev: RevisionId;
      /** Only present if `GetOptions.revs` is `true` */
      _revs_info?: RevisionInfo[] | undefined;
      /** Only present if `GetOptions.revs_info` is `true` */
      _revisions?: {
        ids: RevisionId[];
        start: number;
      } | undefined;

      /** Attachments where index is attachmentId */
      _attachments?: Attachments | undefined;
    }

    /**
     * Stub attachments are returned by PouchDB by default (attachments option set to false)
     */
    interface StubAttachment {
      /**
       * Mime type of the attachment
       */
      content_type: string;

      /**
       * Database digest of the attachment
       */
      digest: string;

      /**
       * Attachment is a stub
       */
      stub: true;

      /**
       * Length of the attachment
       */
      length: number;
    }

    /**
     * Full attachments are used to create new attachments or returned when the attachments option
     * is true.
     */
    interface FullAttachment {
      /**
       * Mime type of the attachment
       */
      content_type: string;

      /** MD5 hash, starts with "md5-" prefix; populated by PouchDB for new attachments */
      digest?: string | undefined;

      /**
       * {string} if `binary` was `false`
       * {Blob|Buffer} if `binary` was `true`
       */
      data: AttachmentData;
    }

    type Attachment = StubAttachment | FullAttachment;

    interface Attachments {
      [attachmentId: string]: Attachment;
    }

    type NewDocument<Content extends {}> = Content;
    type Document<Content extends {}> = Content & IdMeta;
    type ExistingDocument<Content extends {}> =
      & Document<Content>
      & RevisionIdMeta;

    /** Existing doc or just object with `_id` and `_rev` */
    type RemoveDocument = IdMeta & RevisionIdMeta;

    type PostDocument<Content extends {}> = NewDocument<Content> & {
      filters?: { [filterName: string]: string } | undefined;
      views?: {
        [viewName: string]: {
          map: string;
          reduce?: string | undefined;
        };
      } | undefined;

      /** You can update an existing doc using _rev */
      _rev?: RevisionId | undefined;

      _attachments?: Attachments | undefined;
    };

    type PutDocument<Content extends {}> =
      & PostDocument<Content>
      & ChangesMeta
      & {
        _id?: DocumentId | undefined;
      };

    interface AllDocsOptions extends Options {
      /**
       * Include attachment data for each document.
       *
       * Requires `include_docs` to be `true`.
       *
       * By default, attachments are Base64-encoded.
       * @see binary
       */
      attachments?: boolean | undefined;
      /**
       * Return attachments as Buffers.
       *
       * Requires `include_docs` to be `true`.
       * Requires `attachments` to be `true`.
       */
      binary?: boolean | undefined;
      /**
       * Include conflict information for each document.
       *
       * Requires `include_docs` to be `true`.
       */
      conflicts?: boolean | undefined;
      /** Reverse ordering of results. */
      descending?: boolean | undefined;
      /** Include contents for each document. */
      include_docs?: boolean | undefined;
      /** Maximum number of documents to return. */
      limit?: number | undefined;
      /**
       * Number of documents to skip before returning.
       *
       * Causes poor performance on IndexedDB and LevelDB.
       */
      skip?: number | undefined;
      /**
       * Include an update_seq value indicating which sequence id
       * of the underlying database the view reflects.
       */
      update_seq?: boolean | undefined;
    }
    interface AllDocsWithKeyOptions extends AllDocsOptions {
      /** Constrain results to documents matching this key. */
      key: DocumentKey;
    }
    interface AllDocsWithKeysOptions extends AllDocsOptions {
      /** Constrains results to documents matching any of these keys. */
      keys: DocumentId[];
    }
    interface AllDocsWithinRangeOptions extends AllDocsOptions {
      /** Low end of range, or high end if `descending` is `true`. */
      startkey: DocumentKey;
      /** High end of range, or low end if `descending` is `true`. */
      endkey: DocumentKey;
      /**
       * Include any documents identified by `endkey`.
       *
       * Defaults to `true`.
       */
      inclusive_end?: boolean | undefined;
    }
    interface AllDocsMeta {
      /** Only present if `conflicts` is `true` */
      _conflicts?: RevisionId[] | undefined;

      _attachments?: Attachments | undefined;
    }
    interface AllDocsResponse<Content extends {}> {
      /** The `skip` if provided, or in CouchDB the actual offset */
      offset: number;
      total_rows: number;
      update_seq?: number | string | undefined;
      rows: Array<{
        /** Only present if `include_docs` was `true`. */
        doc?: ExistingDocument<Content & AllDocsMeta> | undefined;
        id: DocumentId;
        key: DocumentKey;
        value: {
          rev: RevisionId;
          deleted?: boolean | undefined;
        };
      }>;
    }

    interface BulkDocsOptions extends Options {
      new_edits?: boolean | undefined;
    }

    interface BulkGetOptions extends Options {
      docs: Array<{ id: string; rev?: RevisionId | undefined }>;
      revs?: boolean | undefined;
      attachments?: boolean | undefined;
      binary?: boolean | undefined;
    }

    interface BulkGetResponse<Content extends {}> {
      results: Array<{
        id: string;
        docs: Array<{ ok: Content & GetMeta } | { error: Error }>;
      }>;
    }

    interface ChangesMeta {
      _conflicts?: RevisionId[] | undefined;
      _deleted?: boolean | undefined;
      _attachments?: Attachments | undefined;
    }

    interface ChangesOptions {
      /**
       * Does "live" changes.
       */
      live?: boolean | undefined;

      /**
       * Start the results from the change immediately after the given sequence number.
       * You can also pass `'now'` if you want only new changes (when `live` is `true`).
       */
      since?: "now" | number | string | undefined;

      /**
       * Request timeout (in milliseconds).
       */
      timeout?: number | false | undefined;

      /** Include contents for each document. */
      include_docs?: boolean | undefined;

      /** Maximum number of documents to return. */
      limit?: number | false | undefined;

      /** Include conflicts. */
      conflicts?: boolean | undefined;

      /** Include attachments. */
      attachments?: boolean | undefined;

      /** Return attachment data as Blobs/Buffers, instead of as base64-encoded strings. */
      binary?: boolean | undefined;

      /** Reverse the order of the output documents. */
      descending?: boolean | undefined;

      /**
       * For http adapter only, time in milliseconds for server to give a heartbeat to keep long connections open.
       * Defaults to 10000 (10 seconds), use false to disable the default.
       */
      heartbeat?: number | false | undefined;

      /**
       * Reference a filter function from a design document to selectively get updates.
       * To use a view function, pass '_view' here and provide a reference to the view function in options.view.
       * See filtered changes for details.
       */
      filter?: string | ((doc: any, params: any) => any) | undefined;

      /** Only show changes for docs with these ids (array of strings). */
      doc_ids?: string[] | undefined;

      /**
       * Object containing properties that are passed to the filter function, e.g. {"foo:"bar"},
       * where "bar" will be available in the filter function as params.query.foo.
       * To access the params, define your filter function like function (doc, params).
       */
      query_params?: { [paramName: string]: any } | undefined;

      /**
       * Specify a view function (e.g. 'design_doc_name/view_name' or 'view_name' as shorthand for 'view_name/view_name') to act as a filter.
       * Documents counted as “passed” for a view filter if a map function emits at least one record for them.
       * Note: options.filter must be set to '_view' for this option to work.
       */
      view?: string | undefined;

      /**
       * Filter using a query/pouchdb-find selector. Note: Selectors are not supported in CouchDB 1.x.
       * Cannot be used in combination with the filter option.
       */
      selector?: Find.Selector | undefined;

      /**
       * (previously options.returnDocs): Is available for non-http databases and defaults to true.
       * Passing false prevents the changes feed from keeping all the documents in memory – in other
       * words complete always has an empty results array, and the change event is the only way to get the event.
       * Useful for large change sets where otherwise you would run out of memory.
       */
      return_docs?: boolean | undefined;

      /**
       * Only available for http databases, this configures how many changes to fetch at a time.
       * Increasing this can reduce the number of requests made. Default is 25.
       */
      batch_size?: number | undefined;

      /**
       * Specifies how many revisions are returned in the changes array.
       * The default, 'main_only', will only return the current “winning” revision;
       * 'all_docs' will return all leaf revisions (including conflicts and deleted former conflicts).
       * Most likely you won’t need this unless you’re writing a replicator.
       */
      style?: "main_only" | "all_docs" | undefined;

      /**
       * Only available for http databases. Specifies that seq information only be generated every N changes.
       * Larger values can improve changes throughput with CouchDB 2.0 and later.
       * Note that last_seq is always populated regardless.
       */
      seq_interval?: number | undefined;
    }

    interface ChangesResponseChange<Content extends {}> {
      id: string;
      seq: number | string;
      changes: Array<{ rev: string }>;
      deleted?: boolean | undefined;
      doc?: ExistingDocument<Content & ChangesMeta> | undefined;
    }

    interface ChangesResponse<Content extends {}> {
      status: string;
      last_seq: number | string;
      results: Array<ChangesResponseChange<Content>>;
    }

    interface Changes<Content extends {}>
      extends EventEmitter, Promise<ChangesResponse<Content>> {
      on(
        event: "change",
        listener: (value: ChangesResponseChange<Content>) => any,
      ): this;
      on(
        event: "complete",
        listener: (value: ChangesResponse<Content>) => any,
      ): this;
      on(event: "error", listener: (value: any) => any): this;

      cancel(): void;
    }

    interface GetOptions extends Options {
      /** Include list of conflicting leaf revisions. */
      conflicts?: boolean | undefined;
      /** Specific revision to fetch */
      rev?: RevisionId | undefined;
      /** Include revision history of the document. */
      revs?: boolean | undefined;
      /**
       * Include a list of revisions of the document, and their
       * availability.
       */
      revs_info?: boolean | undefined;

      /** Include attachment data. */
      attachments?: boolean | undefined;

      /** Return attachment data as Blobs/Buffers, instead of as base64-encoded strings. */
      binary?: boolean | undefined;

      /** Forces retrieving latest “leaf” revision, no matter what rev was requested. */
      latest?: boolean | undefined;
    }

    interface GetOpenRevisions extends Options {
      /**
       * Fetch all leaf revisions if open_revs="all" or fetch all leaf
       * revisions specified in open_revs array. Leaves will be returned
       * in the same order as specified in input array.
       */
      open_revs: "all" | RevisionId[];

      /** Include revision history of the document. */
      revs?: boolean | undefined;
    }

    interface CompactOptions extends Options {
      interval?: number | undefined;
    }

    interface PutOptions extends Options {
      force?: boolean | undefined;
    }

    interface RemoveAttachmentResponse extends BasicResponse {
      id: DocumentId;
      rev: RevisionId;
    }
  }

  /**
   * Pass this to `PouchDB.plugin()`.
   */
  type Plugin<PluginProps extends object = {}> =
    | PluginProps
    | ((
      db:
        & Database
        & {
          -readonly [PluginProp in keyof PluginProps]: PluginProps[PluginProp];
        },
    ) => void);

  namespace Configuration {
    interface CommonDatabaseConfiguration {
      /**
       * Database name.
       */
      name?: string | undefined;
      /**
       * Database adapter to use.
       *
       * If unspecified, PouchDB will infer this automatically, preferring
       * IndexedDB to WebSQL in browsers that support both (i.e. Chrome,
       * Opera and Android 4.4+).
       */
      adapter?: string | undefined;
    }

    interface LocalDatabaseConfiguration extends CommonDatabaseConfiguration {
      /**
       * Enables auto compaction, which means compact() is called after
       * every change to the database.
       *
       * Defaults to false.
       */
      auto_compaction?: boolean | undefined;
      /**
       * How many old revisions we keep track (not a copy) of.
       */
      revs_limit?: number | undefined;
      /**
       * Size of the database (Most significant for Safari)
       * option to set the max size in MB that Safari will grant to the local database. Valid options are: 10, 50, 100, 500 and 1000
       * ex_ new PouchDB("dbName", {size:100});
       */
      size?: number | undefined;
      /**
       * A special constructor option, which appends a prefix to the database name
       * and can be helpful for URL-based or file-based LevelDOWN path names.
       */
      prefix?: string | undefined;
      /**
       * Use a md5 hash to create a deterministic revision number for documents.
       * Setting it to false will mean that the revision number will be a random UUID.
       * Defaults to true.
       */
      deterministic_revs?: boolean | undefined;
    }

    interface RemoteDatabaseConfiguration extends CommonDatabaseConfiguration {
      fetch?: Fetch | undefined;

      auth?: {
        username?: string | undefined;
        password?: string | undefined;
      } | undefined;
      /**
       * Disables automatic creation of databases.
       */
      skip_setup?: boolean | undefined;
    }

    type DatabaseConfiguration =
      | LocalDatabaseConfiguration
      | RemoteDatabaseConfiguration;
  }

  interface Static<PluginProps extends object = {}> extends EventEmitter {
    plugin<PluginSubProps extends object>(
      plugin: Plugin<PluginSubProps>,
    ): Static<PluginProps & PluginSubProps>;

    version: string;

    fetch: Fetch;

    on(event: "created" | "destroyed", listener: (dbName: string) => any): this;

    debug: debug.IDebug;

    new <Content extends {} = {}>(
      name?: string,
      options?: Configuration.DatabaseConfiguration,
    ): Database<Content> & PluginProps;
    new <Content extends {}>(
      name: string | null,
      options: HttpAdapter.HttpAdapterConfiguration,
    ): Database<Content> & PluginProps;
    new <Content extends {}>(
      name: string | null,
      options: MemoryAdapter.MemoryAdapterConfiguration,
    ): Database<Content> & PluginProps;
    new <Content extends {}>(
      name: string | null,
      options: IdbAdapter.IdbAdapterConfiguration,
    ): Database<Content> & PluginProps;
    new <Content extends {}>(
      name: string | null,
      options: IndexedDBAdapter.IndexedDBAdapterConfiguration,
    ): Database<Content> & PluginProps;

    /**
     * The returned object is a constructor function that works the same as PouchDB,
     * except that whenever you invoke it (e.g. with new), the given options will be passed in by default.
     */
    defaults(options: Configuration.DatabaseConfiguration): {
      new <Content extends {} = {}>(
        name?: string,
        options?: Configuration.DatabaseConfiguration,
      ): Database<Content> & PluginProps;
    };
    defaults(options: HttpAdapter.HttpAdapterConfiguration): {
      new <Content extends {} = {}>(
        name?: string,
        options?: HttpAdapter.HttpAdapterConfiguration,
      ): Database<Content> & PluginProps;
    };
    defaults(options: MemoryAdapter.MemoryAdapterConfiguration): {
      new <Content extends {} = {}>(
        name?: string,
        options?: MemoryAdapter.MemoryAdapterConfiguration,
      ): Database<Content> & PluginProps;
    };
    defaults(options: IdbAdapter.IdbAdapterConfiguration): {
      new <Content extends {} = {}>(
        name?: string,
        options?: IdbAdapter.IdbAdapterConfiguration,
      ): Database<Content> & PluginProps;
    };
    defaults(options: IndexedDBAdapter.IndexedDBAdapterConfiguration): {
      new <Content extends {} = {}>(
        name?: string,
        options?: IndexedDBAdapter.IndexedDBAdapterConfiguration,
      ): Database<Content> & PluginProps;
    };
  }

  interface Database<Content extends {} = {}> extends EventEmitter {
    /** The name passed to the PouchDB constructor and unique identifier of the database. */
    name: string;

    /** Fetch all documents matching the given options. */
    allDocs<Model>(
      options?:
        | Core.AllDocsWithKeyOptions
        | Core.AllDocsWithKeysOptions
        | Core.AllDocsWithinRangeOptions
        | Core.AllDocsOptions,
    ): Promise<Core.AllDocsResponse<Content & Model>>;

    /**
     * Create, update or delete multiple documents. The docs argument is an array of documents.
     * If you omit an _id parameter on a given document, the database will create a new document and assign the ID for you.
     * To update a document, you must include both an _id parameter and a _rev parameter,
     * which should match the ID and revision of the document on which to base your updates.
     * Finally, to delete a document, include a _deleted parameter with the value true.
     */
    bulkDocs<Model>(
      docs: Array<Core.PutDocument<Content & Model>>,
      options: Core.BulkDocsOptions | null,
      callback: Core.Callback<Array<Core.Response | Core.Error>>,
    ): void;

    /**
     * Create, update or delete multiple documents. The docs argument is an array of documents.
     * If you omit an _id parameter on a given document, the database will create a new document and assign the ID for you.
     * To update a document, you must include both an _id parameter and a _rev parameter,
     * which should match the ID and revision of the document on which to base your updates.
     * Finally, to delete a document, include a _deleted parameter with the value true.
     */
    bulkDocs<Model>(
      docs: Array<Core.PutDocument<Content & Model>>,
      options?: Core.BulkDocsOptions,
    ): Promise<Array<Core.Response | Core.Error>>;

    /** Compact the database */
    compact(options?: Core.CompactOptions): Promise<Core.Response>;

    /** Compact the database */
    compact(
      options: Core.CompactOptions,
      callback: Core.Callback<Core.Response>,
    ): void;

    /** Destroy the database */
    destroy(options: Core.Options | null, callback: Core.Callback<any>): void;

    /** Destroy the database */
    destroy(options?: Core.Options | null): Promise<void>;

    /** Fetch a document */
    get<Model>(
      docId: Core.DocumentId,
      options: Core.GetOptions | null,
      callback: Core.Callback<Core.Document<Content & Model> & Core.GetMeta>,
    ): void;

    /** Fetch a document */
    get<Model>(
      docId: Core.DocumentId,
      options: Core.GetOpenRevisions,
      callback: Core.Callback<Array<Core.Revision<Content & Model>>>,
    ): void;

    /** Fetch a document */
    get<Model>(
      docId: Core.DocumentId,
      options?: Core.GetOptions,
    ): Promise<Core.Document<Content & Model> & Core.GetMeta>;

    /** Fetch a document */
    get<Model>(
      docId: Core.DocumentId,
      options: Core.GetOpenRevisions,
    ): Promise<Array<Core.Revision<Content & Model>>>;

    /**
     * Create a new document without providing an id.
     *
     * You should prefer put() to post(), because when you post(), you are
     * missing an opportunity to use allDocs() to sort documents by _id
     * (because your _ids are random).
     *
     * @see {@link https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html|PouchDB Pro Tips}
     */
    post<Model>(
      doc: Core.PostDocument<Content & Model>,
      options: Core.Options | null,
      callback: Core.Callback<Core.Response>,
    ): void;

    /**
     * Create a new document without providing an id.
     *
     * You should prefer put() to post(), because when you post(), you are
     * missing an opportunity to use allDocs() to sort documents by _id
     * (because your _ids are random).
     *
     * @see {@link https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html|PouchDB Pro Tips}
     */
    post<Model>(
      doc: Core.PostDocument<Content & Model>,
      options?: Core.Options,
    ): Promise<Core.Response>;

    /**
     * Create a new document or update an existing document.
     *
     * If the document already exists, you must specify its revision _rev,
     * otherwise a conflict will occur.
     * There are some restrictions on valid property names of the documents.
     * If you try to store non-JSON data (for instance Date objects) you may
     * see inconsistent results.
     */
    put<Model>(
      doc: Core.PutDocument<Content & Model>,
      options: Core.PutOptions | null,
      callback: Core.Callback<Core.Response>,
    ): void;

    /**
     * Create a new document or update an existing document.
     *
     * If the document already exists, you must specify its revision _rev,
     * otherwise a conflict will occur.
     * There are some restrictions on valid property names of the documents.
     * If you try to store non-JSON data (for instance Date objects) you may
     * see inconsistent results.
     */
    put<Model>(
      doc: Core.PutDocument<Content & Model>,
      options?: Core.PutOptions,
    ): Promise<Core.Response>;

    /** Remove a doc from the database */
    remove(
      doc: Core.RemoveDocument,
      options: Core.Options,
      callback: Core.Callback<Core.Response>,
    ): void;

    /** Remove a doc from the database */
    remove(
      docId: Core.DocumentId,
      revision: Core.RevisionId,
      options: Core.Options,
      callback: Core.Callback<Core.Response>,
    ): void;

    /** Remove a doc from the database */
    remove(
      doc: Core.RemoveDocument,
      options?: Core.Options,
    ): Promise<Core.Response>;

    /** Remove a doc from the database */
    remove(
      docId: Core.DocumentId,
      revision: Core.RevisionId,
      options?: Core.Options,
    ): Promise<Core.Response>;

    /** Get database information */
    info(callback: Core.Callback<Core.DatabaseInfo>): void;

    /** Get database information */
    info(): Promise<Core.DatabaseInfo>;

    /**
     * A list of changes made to documents in the database, in the order they were made.
     * It returns an object with the method cancel(), which you call if you don’t want to listen to new changes anymore.
     *
     * It is an event emitter and will emit a 'change' event on each document change,
     * a 'complete' event when all the changes have been processed, and an 'error' event when an error occurs.
     * Calling cancel() will unsubscribe all event listeners automatically.
     */
    changes<Model>(
      options: Core.ChangesOptions | null,
      callback: Core.Callback<Core.Changes<Content & Model>>,
    ): void;

    /**
     * A list of changes made to documents in the database, in the order they were made.
     * It returns an object with the method cancel(), which you call if you don’t want to listen to new changes anymore.
     *
     * It is an event emitter and will emit a 'change' event on each document change,
     * a 'complete' event when all the changes have been processed, and an 'error' event when an error occurs.
     * Calling cancel() will unsubscribe all event listeners automatically.
     */
    changes<Model>(
      options?: Core.ChangesOptions,
    ): Core.Changes<Content & Model>;

    /** Close the database */
    close(callback: Core.Callback<any>): void;

    /** Close the database */
    close(): Promise<void>;

    /**
     * Attaches a binary object to a document.
     * This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
     * If the document doesn’t already exist, then this method will create an empty document containing the attachment.
     */
    putAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      rev: Core.RevisionId,
      attachment: Core.AttachmentData,
      type: string,
      callback: Core.Callback<Core.Response>,
    ): void;

    /**
     * Attaches a binary object to a document.
     * This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
     * If the document doesn’t already exist, then this method will create an empty document containing the attachment.
     */
    putAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      rev: Core.RevisionId,
      attachment: Core.AttachmentData,
      type: string,
    ): Promise<Core.Response>;

    /**
     * Attaches a binary object to a document.
     * This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
     * If the document doesn’t already exist, then this method will create an empty document containing the attachment.
     */
    putAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      attachment: Core.AttachmentData,
      type: string,
      callback: Core.Callback<Core.Response>,
    ): void;

    /**
     * Attaches a binary object to a document.
     * This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
     * If the document doesn’t already exist, then this method will create an empty document containing the attachment.
     */
    putAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      attachment: Core.AttachmentData,
      type: string,
    ): Promise<Core.Response>;

    /** Get attachment data */
    getAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      options: { rev?: Core.RevisionId | undefined },
      callback: Core.Callback<Blob | Buffer>,
    ): void;

    /** Get attachment data */
    getAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      options?: { rev?: Core.RevisionId | undefined },
    ): Promise<Blob | Buffer>;

    /** Get attachment data */
    getAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      callback: Core.Callback<Blob | Buffer>,
    ): void;

    /** Delete an attachment from a doc. You must supply the rev of the existing doc. */
    removeAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      rev: Core.RevisionId,
      callback: Core.Callback<Core.RemoveAttachmentResponse>,
    ): void;

    /** Delete an attachment from a doc. You must supply the rev of the existing doc. */
    removeAttachment(
      docId: Core.DocumentId,
      attachmentId: Core.AttachmentId,
      rev: Core.RevisionId,
    ): Promise<Core.RemoveAttachmentResponse>;

    /** Given a set of document/revision IDs, returns the document bodies (and, optionally, attachment data) for each ID/revision pair specified. */
    bulkGet<Model>(
      options: Core.BulkGetOptions,
      callback: Core.Callback<Core.BulkGetResponse<Content & Model>>,
    ): void;

    /** Given a set of document/revision IDs, returns the document bodies (and, optionally, attachment data) for each ID/revision pair specified. */
    bulkGet<Model>(
      options: Core.BulkGetOptions,
    ): Promise<Core.BulkGetResponse<Content & Model>>;

    /** Given a set of document/revision IDs, returns the subset of those that do not correspond to revisions stored in the database */
    revsDiff(
      diff: Core.RevisionDiffOptions,
      callback: Core.Callback<Core.RevisionDiffResponse>,
    ): void;

    /** Given a set of document/revision IDs, returns the subset of those that do not correspond to revisions stored in the database */
    revsDiff(
      diff: Core.RevisionDiffOptions,
    ): Promise<Core.RevisionDiffResponse>;
  }

  // HTTP adapter augmentation

  namespace HttpAdapter {
    interface HttpAdapterConfiguration
      extends Configuration.RemoteDatabaseConfiguration {
      adapter: "http";
    }
  }

  // IndexedDB adapter augmentation

  namespace Core {
    interface DatabaseInfo {
      idb_attachment_format?: "base64" | "binary" | undefined;
    }
  }

  namespace IdbAdapter {
    interface IdbAdapterConfiguration
      extends Configuration.LocalDatabaseConfiguration {
      /**
       * Configures storage persistence.
       *
       * Only works in Firefox 26+.
       */
      storage?: "persistent" | "temporary" | undefined;
      /**
       * Configure the directory path for IndexedDBShim `__sysdb__.sqlite`.
       *
       * Only applies to the first adapter call; subsequent calls will
       * not change the path for the system db file.
       *
       * Only works on module aaronhuggins/indexeddb for Deno;
       * will be removed when Deno implements IndexedDB natively.
       */
      systemPath?: string;
      adapter: "idb";
    }
  }

  namespace IndexedDBAdapter {
    interface IndexedDBAdapterConfiguration
      extends Configuration.LocalDatabaseConfiguration {
      /**
       * Configure the directory path for IndexedDBShim `__sysdb__.sqlite`.
       *
       * Only applies to the first adapter call; subsequent calls will
       * not change the path for the system db file.
       *
       * Only works on module aaronhuggins/indexeddb for Deno;
       * will be removed when Deno implements IndexedDB natively.
       */
      systemPath?: string;
      adapter: "indexeddb";
    }
  }

  // Memory adapter augmentation

  namespace MemoryAdapter {
    interface MemoryAdapterConfiguration
      extends Configuration.RemoteDatabaseConfiguration {
      adapter: "memory";
    }
  }

  // Find plugin augmentation

  namespace Find {
    interface ConditionOperators {
      /** Match fields "less than" this one. */
      $lt?: any;

      /** Match fields "greater than" this one. */
      $gt?: any;

      /** Match fields "less than or equal to" this one. */
      $lte?: any;

      /** Match fields "greater than or equal to" this one. */
      $gte?: any;

      /** Match fields equal to this one. */
      $eq?: any;

      /** Match fields not equal to this one. */
      $ne?: any;

      /** True if the field should exist, false otherwise. */
      $exists?: boolean | undefined;

      /** One of: "null", "boolean", "number", "string", "array", or "object". */
      $type?:
        | "null"
        | "boolean"
        | "number"
        | "string"
        | "array"
        | "object"
        | undefined;

      /** The document field must exist in the list provided. */
      $in?: any[] | undefined;

      /** The document field must not exist in the list provided. */
      $nin?: any[] | undefined;

      /** Special condition to match the length of an array field in a document. Non-array fields cannot match this condition. */
      $size?: number | undefined;

      /**
       * Divisor and Remainder are both positive or negative integers.
       * Non-integer values result in a 404 status.
       * Matches documents where (field % Divisor == Remainder) is true, and only when the document field is an integer.
       * [divisor, remainder]
       */
      $mod?: [number, number] | undefined;

      /** A regular expression pattern to match against the document field. Only matches when the field is a string value and matches the supplied regular expression. */
      $regex?: string | undefined;

      /** Matches an array value if it contains all the elements of the argument array. */
      $all?: any[] | undefined;

      $elemMatch?: ConditionOperators | undefined;
    }

    interface CombinationOperators {
      /** Matches if all the selectors in the array match. */
      $and?: Selector[] | undefined;

      /** Matches if any of the selectors in the array match. All selectors must use the same index. */
      $or?: Selector[] | undefined;

      /** Matches if the given selector does not match. */
      $not?: Selector | undefined;

      /** Matches if none of the selectors in the array match. */
      $nor?: Selector[] | undefined;
    }

    interface Selector extends CombinationOperators {
      [field: string]: Selector | Selector[] | ConditionOperators | any;

      _id?: string | ConditionOperators | undefined;
    }

    interface FindRequest<Content extends {}> {
      /** Defines a selector to filter the results. Required */
      selector: Selector;

      /** Defines a list of fields that you want to receive. If omitted, you get the full documents. */
      fields?: string[] | undefined;

      /** Defines a list of fields defining how you want to sort. Note that sorted fields also have to be selected in the selector. */
      sort?: Array<string | { [propName: string]: "asc" | "desc" }> | undefined;

      /** Maximum number of documents to return. */
      limit?: number | undefined;

      /** Number of docs to skip before returning. */
      skip?: number | undefined;

      /** Set which index to use for the query. It can be “design-doc-name” or “[‘design-doc-name’, ‘name’]”. */
      use_index?: string | [string, string] | undefined;
    }

    interface FindResponse<Content extends {}> {
      docs: Array<Core.ExistingDocument<Content>>;
      warning?: string | undefined;
    }

    interface CreateIndexOptions {
      index: {
        /** List of fields to index */
        fields: string[];

        /** Name of the index, auto-generated if you don't include it */
        name?: string | undefined;

        /** Design document name (i.e. the part after '_design/', auto-generated if you don't include it */
        ddoc?: string | undefined;

        /** Only supports 'json', and it's also the default */
        type?: string | undefined;
      };
    }

    interface CreateIndexResponse<Content extends {}> {
      result: string;
    }

    interface Index {
      /** Name of the index, auto-generated if you don't include it */
      name: string;

      /** Design document name (i.e. the part after '_design/', auto-generated if you don't include it */
      ddoc: string | null;

      /** Only supports 'json' */
      type: string;

      def: {
        fields: Array<{
          [fieldName: string]: string;
        }>;
      };
    }

    interface GetIndexesResponse<Content extends {}> {
      indexes: Index[];
    }

    interface DeleteIndexOptions {
      /** Name of the index */
      name: string;

      /** Design document name */
      ddoc: string;

      /** Default 'json' */
      type?: string | undefined;
    }

    interface DeleteIndexResponse<Content extends {}> {
      [propertyName: string]: any;
    }
  }

  interface Database<Content extends {} = {}> {
    /** Query the API to find some documents. */
    find(
      request: Find.FindRequest<Content>,
      callback: Core.Callback<Find.FindResponse<Content>>,
    ): void;
    find(
      request?: Find.FindRequest<Content>,
    ): Promise<Find.FindResponse<Content>>;

    /** Create an index if it doesn't exist, or do nothing if it already exists. */
    createIndex(
      index: Find.CreateIndexOptions,
      callback: Core.Callback<Find.CreateIndexResponse<Content>>,
    ): void;
    createIndex(
      index?: Find.CreateIndexOptions,
    ): Promise<Find.CreateIndexResponse<Content>>;

    /** Get a list of all the indexes you've created. Also tells you about the special _all_docs index, i.e. the default index on the _id field. */
    getIndexes(callback: Core.Callback<Find.GetIndexesResponse<Content>>): void;
    getIndexes(): Promise<Find.GetIndexesResponse<Content>>;

    /** Delete an index and clean up any leftover data on the disk. */
    deleteIndex(
      index: Find.DeleteIndexOptions,
      callback: Core.Callback<Find.DeleteIndexResponse<Content>>,
    ): void;
    deleteIndex(
      index?: Find.DeleteIndexOptions,
    ): Promise<Find.DeleteIndexResponse<Content>>;
  }

  // MapReduce plugin augmentation

  type BuiltInReducers = "_sum" | "_count" | "_stats";
  /**
   * CouchDB-style Map function
   *
   * @param emit CouchDB does not support emit as an argument and maps defined this way will always run locally
   */
  type Map<Content extends {}, Result> = (
    doc: Content,
    emit?: (key: any, value: Content | Result) => void,
  ) => void;
  /**
   * CouchDB-style Reduction function
   *
   * @param keys From CouchDB documentation: Array of pairs of docid-key for related map function results;
   *             PouchDB may pass a simple array and also supports complex keys.
   */
  type Reducer<Content extends {}, Reduction> = (
    keys: any | null,
    values: Content[] | Reduction[],
    rereduce: boolean,
  ) => Reduction[] | Reduction;

  interface Filter<Content extends {}, Reduction> {
    // Assume that Content | Reduction is enough leverage in most cases to handle intermediate map emits
    map: Map<Content, Reduction>;
    reduce?: Reducer<Content, Reduction> | BuiltInReducers | string | undefined;
  }

  namespace Query {
    interface Options<Content extends {}, Reduction> {
      /** Reduce function, or the string name of a built-in function: '_sum', '_count', or '_stats'. */
      reduce?:
        | Reducer<Content, Reduction>
        | BuiltInReducers
        | boolean
        | undefined;
      /** Include the document in each row in the doc field. */
      include_docs?: boolean | undefined;
      /** Include conflicts in the _conflicts field of a doc. */
      conflicts?: boolean | undefined;
      /** Include attachment data. */
      attachments?: boolean | undefined;
      /** Return attachment data as Blobs/Buffers, instead of as base64-encoded strings. */
      binary?: boolean | undefined;
      /** Get rows with keys in a certain range (inclusive/inclusive). */
      startkey?: any;
      /** Get rows with keys in a certain range (inclusive/inclusive). */
      endkey?: any;
      /** Include rows having a key equal to the given options.endkey. */
      inclusive_end?: boolean | undefined;
      /** Maximum number of rows to return. */
      limit?: number | undefined;
      /** Number of rows to skip before returning (warning: poor performance on IndexedDB/LevelDB!). */
      skip?: number | undefined;
      /** Reverse the order of the output rows. */
      descending?: boolean | undefined;
      /** Only return rows matching this key. */
      key?: any;
      /** Array of keys to fetch in a single shot. */
      keys?: any[] | undefined;
      /** True if you want the reduce function to group results by keys, rather than returning a single result. */
      group?: boolean | undefined;
      /**
       * Number of elements in a key to group by, assuming the keys are arrays.
       * Defaults to the full length of the array.
       */
      group_level?: number | undefined;
      /**
       * unspecified (default): Returns the latest results, waiting for the view to build if necessary.
       * 'ok': Returns results immediately, even if they’re out-of-date.
       * 'update_after': Returns results immediately, but kicks off a build afterwards.
       */
      stale?: "ok" | "update_after" | undefined;
      /**
       * Include an update_seq value indicating which sequence id
       * of the underlying database the view reflects.
       */
      update_seq?: boolean | undefined;
    }

    interface Response<Content extends {}> {
      total_rows: number;
      offset: number;
      rows: Array<{
        id: any;
        key: any;
        value: any;
        doc?: Core.ExistingDocument<Content & Core.AllDocsMeta> | undefined;
      }>;
    }
  }

  interface Database<Content extends {} = {}> {
    /**
     * Cleans up any stale map/reduce indexes.
     *
     * As design docs are deleted or modified, their associated index
     * files(in CouchDB) or companion databases (in local PouchDBs) continue
     * to take up space on disk. viewCleanup() removes these unnecessary
     * index files.
     */
    viewCleanup(callback: Core.Callback<Core.BasicResponse>): void;
    /**
     * Cleans up any stale map/reduce indexes.
     *
     * As design docs are deleted or modified, their associated index
     * files(in CouchDB) or companion databases (in local PouchDBs) continue
     * to take up space on disk. viewCleanup() removes these unnecessary
     * index files.
     */
    viewCleanup(): Promise<Core.BasicResponse>;

    /**
     * Invoke a map/reduce function, which allows you to perform more complex queries
     * on PouchDB than what you get with allDocs().
     */
    query<Result, Model = Content>(
      fun: string | Map<Model, Result> | Filter<Model, Result>,
      opts: Query.Options<Model, Result>,
      callback: Core.Callback<Query.Response<Result>>,
    ): void;
    /**
     * Invoke a map/reduce function, which allows you to perform more complex queries
     * on PouchDB than what you get with allDocs().
     */
    query<Result, Model = Content>(
      fun: string | Map<Model, Result> | Filter<Model, Result>,
      callback: Core.Callback<Query.Response<Result>>,
    ): void;
    /**
     * Invoke a map/reduce function, which allows you to perform more complex queries
     * on PouchDB than what you get with allDocs().
     */
    query<Result, Model = Content>(
      fun: string | Map<Model, Result> | Filter<Model, Result>,
      opts?: Query.Options<Model, Result>,
    ): Promise<Query.Response<Result>>;
  }

  // Replication plugin augmentation

  namespace Replication {
    interface ReplicateOptions {
      /** If true, starts subscribing to future changes in the source database and continue replicating them. */
      live?: boolean | undefined;

      /**
       * If true will attempt to retry replications in the case of failure (due to being offline),
       * using a backoff algorithm that retries at longer and longer intervals until a connection is re-established,
       * with a maximum delay of 10 minutes. Only applicable if options.live is also true.
       */
      retry?: boolean | undefined;

      /**
       * Reference a filter function from a design document to selectively get updates.
       * To use a view function, pass '_view' here and provide a reference to the view function in options.view.
       * See filtered changes for details.
       */
      filter?: string | ((doc: any, params: any) => any) | undefined;

      /** Only show changes for docs with these ids (array of strings). */
      doc_ids?: string[] | undefined;

      /**
       * Object containing properties that are passed to the filter function, e.g. {"foo:"bar"},
       * where "bar" will be available in the filter function as params.query.foo.
       * To access the params, define your filter function like function (doc, params).
       */
      query_params?: { [paramName: string]: any } | undefined;

      /**
       * Specify a view function (e.g. 'design_doc_name/view_name' or 'view_name' as shorthand for 'view_name/view_name') to act as a filter.
       * Documents counted as “passed” for a view filter if a map function emits at least one record for them.
       * Note: options.filter must be set to '_view' for this option to work.
       */
      view?: string | undefined;

      /**
       * Filter using a query/pouchdb-find selector. Note: Selectors are not supported in CouchDB 1.x.
       */
      selector?: Find.Selector | undefined;

      /** Replicate changes after the given sequence number. */
      since?: any;

      /** Configure the heartbeat supported by CouchDB which keeps the change connection alive. */
      heartbeat?: any;

      /** Request timeout (in milliseconds). */
      timeout?: number | false | undefined;

      /**
       * Number of change feed items to process at a time. Defaults to 100.
       * This affects the number of docs and attachments held in memory and the number sent at a time to the target server.
       * You may need to adjust downward if targeting devices with low amounts of memory
       * e.g. or if the documents and/or attachments are large in size or if there are many conflicted revisions.
       * If your documents are small in size, then increasing this number will probably speed replication up.
       */
      batch_size?: number | undefined;

      /**
       * Number of batches to process at a time. Defaults to 10.
       * This (along wtih batch_size) controls how many docs are kept in memory at a time,
       * so the maximum docs in memory at once would equal batch_size × batches_limit.
       */
      batches_limit?: number | undefined;

      /**
       * Backoff function to be used in retry replication. This is a function that takes the current
       * backoff as input (or 0 the first time) and returns a new backoff in milliseconds.
       * You can use this to tweak when and how replication will try to reconnect to a remote database when the user goes offline.
       * Defaults to a function that chooses a random backoff between 0 and 2 seconds and doubles every time it fails to connect.
       * The default delay will never exceed 10 minutes.
       */
      back_off_function?(delay: number): number;

      /**
       * Can be used if you want to disable checkpoints on the source, target, or both.
       * Setting this option to false will prevent writing checkpoints on both source and target.
       * Setting it to source will only write checkpoints on the source.
       * Setting it to target will only write checkpoints on the target.
       */
      checkpoint?: boolean | "target" | "source" | undefined;
    }

    interface ReplicationEventEmitter<Content extends {}, C, F>
      extends EventEmitter {
      on(event: "change", listener: (info: C) => any): this;
      on(
        event: "paused" | "denied" | "error",
        listener: (err: {}) => any,
      ): this;
      on(event: "active", listener: () => any): this;
      on(event: "complete", listener: (info: F) => any): this;

      cancel(): void;
    }

    interface Replication<Content extends {}> extends
      ReplicationEventEmitter<
        Content,
        ReplicationResult<Content>,
        ReplicationResultComplete<Content>
      >,
      Promise<ReplicationResultComplete<Content>> {
    }

    interface ReplicationResult<Content extends {}> {
      doc_write_failures: number;
      docs_read: number;
      docs_written: number;
      last_seq: number;
      start_time: Date;
      ok: boolean;
      errors: any[];
      docs: Array<Core.ExistingDocument<Content>>;
    }

    interface ReplicationResultComplete<Content extends {}>
      extends ReplicationResult<Content> {
      end_time: Date;
      status: string;
    }

    interface SyncOptions extends ReplicateOptions {
      push?: ReplicateOptions | undefined;
      pull?: ReplicateOptions | undefined;
    }

    interface Sync<Content extends {}> extends
      ReplicationEventEmitter<
        Content,
        SyncResult<Content>,
        SyncResultComplete<Content>
      >,
      Promise<SyncResultComplete<Content>> {
    }

    interface SyncResult<Content extends {}> {
      direction: "push" | "pull";
      change: ReplicationResult<Content>;
    }

    interface SyncResultComplete<Content extends {}> {
      push?: ReplicationResultComplete<Content> | undefined;
      pull?: ReplicationResultComplete<Content> | undefined;
    }
  }

  interface Static {
    /**
     * Replicate data from source to target. Both the source and target can be a PouchDB instance or a string
     * representing a CouchDB database URL or the name of a local PouchDB database. If options.live is true,
     * then this will track future changes and also replicate them automatically.
     * This method returns an object with the method cancel(), which you call if you want to cancel live replication.
     */
    replicate<Content>(
      source: string | Database<Content>,
      target: string | Database<Content>,
      options?: Replication.ReplicateOptions,
      callback?: Core.Callback<Replication.ReplicationResultComplete<Content>>,
    ): Replication.Replication<Content>;

    /**
     * Sync data from src to target and target to src. This is a convenience method for bidirectional data replication.
     *
     * In other words, this code:
     * `PouchDB.replicate('mydb', 'http://localhost:5984/mydb')`;
     * `PouchDB.replicate('http://localhost:5984/mydb', 'mydb')`;
     * is equivalent to this code:
     * `PouchDB.sync('mydb', 'http://localhost:5984/mydb')`;
     */
    sync<Content>(
      source: string | Database<Content>,
      target: string | Database<Content>,
      options?: Replication.SyncOptions,
      callback?: Core.Callback<Replication.SyncResultComplete<Content>>,
    ): Replication.Sync<Content>;
  }

  interface Database<Content extends {} = {}> {
    replicate: {
      /**
       * Replicate data to `target`. Both the source and target can be a PouchDB instance
       * or a string representing a CouchDB database URL or the name of a local PouchDB database.
       * If options.live is true, then this will track future changes and also replicate them automatically.
       * This method returns an object with the method cancel(), which you call if you want to cancel live replication.
       */
      to<Content>(
        target: string | Database<Content>,
        options?: Replication.ReplicateOptions,
        callback?: Core.Callback<
          Replication.ReplicationResultComplete<Content>
        >,
      ): Replication.Replication<Content>;

      /**
       * Replicate data from `source`. Both the source and target can be a PouchDB instance
       * or a string representing a CouchDB database URL or the name of a local PouchDB database.
       * If options.live is true, then this will track future changes and also replicate them automatically.
       * This method returns an object with the method cancel(), which you call if you want to cancel live replication.
       */
      from<Content>(
        source: string | Database<Content>,
        options?: Replication.ReplicateOptions,
        callback?: Core.Callback<
          Replication.ReplicationResultComplete<Content>
        >,
      ): Replication.Replication<Content>;
    };

    /**
     * Sync data from src to target and target to src. This is a convenience method for bidirectional data replication.
     *
     * In other words, this code:
     * `PouchDB.replicate('mydb', 'http://localhost:5984/mydb')`;
     * `PouchDB.replicate('http://localhost:5984/mydb', 'mydb')`;
     * is equivalent to this code:
     * `PouchDB.sync('mydb', 'http://localhost:5984/mydb')`;
     */
    sync<Content>(
      remote: string | Database<Content>,
      options?: Replication.SyncOptions,
      callback?: Core.Callback<Replication.SyncResultComplete<Content>>,
    ): Replication.Sync<Content>;
  }
}
