import d64 from 'https://cdn.skypack.dev/d64'
import { sortedIndexOf } from './utils.ts'
import { TaskQueue } from './taskqueue.ts'
import { LocalCallback, LocalStorageCore } from './localstorage_core.ts'

const arrayBuffPrefix = 'ArrayBuffer:'
const uintPrefix = 'Uint8Array:'

export class LocalStorage {
  #store: LocalStorageCore
  #queue: TaskQueue
  #keys: string[] = []

  constructor (dbname: string) {
    this.#store = new LocalStorageCore(dbname)
    this.#queue = new TaskQueue()
  }

  sequentialize (callback: LocalCallback, fun: LocalCallback) {
    this.#queue.add(fun, callback)
  }

  init (callback: LocalCallback<void>) {
    this.sequentialize(callback, (callback) => {
      this.#store.getKeys((err, keys) => {
        if (err) {
          return callback(err)
        }
        this.#keys = keys ?? []
        return callback()
      })
    })
  }

  keys (callback: LocalCallback<string[]>) {
    this.sequentialize(callback, (callback) => {
      this.#store.getKeys((_err, keys) => {
        callback(undefined, (keys ?? []).slice())
      })
    })
  }

  setItem (key: string, value: ArrayBuffer | Uint8Array | string, callback: LocalCallback<void>) {
    this.sequentialize(callback, (callback) => {
      if (value && value instanceof ArrayBuffer) {
        value = arrayBuffPrefix + d64.encode(new Uint8Array(value))
      } else if (value && value instanceof Uint8Array) {
        value = uintPrefix + d64.encode(value)
      }

      const idx = sortedIndexOf(this.#keys, key)

      if (this.#keys[idx] !== key) {
        this.#keys.splice(idx, 0, key)
      }

      this.#store.put(key, value, callback)
    })
  }

  getItem (key: string, callback: LocalCallback<string | Uint8Array | ArrayBuffer>) {
    this.sequentialize(callback, (callback) => {
      this.#store.get(key, function (err, retval) {
        if (err) return callback(err)
        if (typeof retval === 'undefined' || retval === null) {
          // 'NotFound' error, consistent with LevelDOWN API
          return callback(new Error('NotFound'))
        }

        let result: string | Uint8Array | ArrayBuffer = retval

        if (typeof retval === 'string') {
          if (retval.startsWith(arrayBuffPrefix)) {
            const d64str = retval.substring(arrayBuffPrefix.length)
            result = new ArrayBuffer(d64.decode(d64str))
          } else if (retval.startsWith(uintPrefix)) {
            const d64str = retval.substring(uintPrefix.length)
            result = new Uint8Array(d64.decode(d64str))
          }
        }

        callback(null, result)
      })
    })
  }

  removeItem (key: string, callback: LocalCallback<void>) {
    this.sequentialize(callback, (callback) => {
      const idx = sortedIndexOf(this.#keys, key)

      if (this.#keys[idx] === key) {
        this.#keys.splice(idx, 1)
        this.#store.remove(key, (err) => {
          if (err) {
            return callback(err)
          }
          callback()
        })
      } else {
        callback()
      }
    })
  }

  length (callback: LocalCallback<number>) {
    this.sequentialize(callback, (callback) => {
      callback(null, this.#keys.length)
    })
  }
}
