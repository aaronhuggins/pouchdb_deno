// deno-lint-ignore-file no-empty-interface
import { IDBFactory as IDBFactory1 } from './indexeddb.ts'

declare global {
  interface IDBFactory extends IDBFactory1 {}

  interface WindowOrWorkerGlobalScope {
    indexedDB: IDBFactory;
  }

  let indexedDB: IDBFactory
}
