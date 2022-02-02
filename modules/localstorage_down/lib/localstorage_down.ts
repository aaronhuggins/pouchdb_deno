// deno-lint-ignore-file no-explicit-any
import { AbstractIterator, AbstractLevelDOWN } from '../deps.ts'
import { LocalStorage } from './localstorage.ts'
import { LocalCallback, LocalStorageCore } from './localstorage_core.ts'
import { sortedIndexOf } from './utils.ts'

const nextTick = queueMicrotask

export class LocalStorageDown extends AbstractLevelDOWN {
  container: LocalStorage

  constructor (location: string) {
    super(location)
    this.container = new LocalStorage(location)
  }

  _open (_options: unknown, callback: LocalCallback<void>) {
    this.container.init(callback)
  }

  _put (key: string, value: any, _options: unknown, callback: LocalCallback<void>) {
    let err = checkKeyValue(key, 'key')

    if (err) return nextTick(() => callback(err))

    err = checkKeyValue(value, 'value')

    if (err) return nextTick(() => callback(err))

    if (typeof value === 'object' && !(value instanceof Uint8Array) && value.buffer === undefined) {
      value = JSON.stringify({
        storetype: 'json',
        data: value
      })
    }

    this.container.setItem(key, value, callback)
  }

  _get (key: string, options: { asBuffer?: boolean }, callback: LocalCallback<string | Uint8Array | ArrayBuffer>) {
    const err = checkKeyValue(key, 'key')

    if (err) return nextTick(() => callback(err))

    // TODO: REMOVE! May be deprecated!
    // if (!Buffer.isBuffer(key)) key = String(key)
    this.container.getItem(key, (err, value) => {
      if (err) return callback(err)

      if (options.asBuffer !== false) {
        if (typeof value === 'string') {
          const encoder = new TextEncoder()
          value = encoder.encode(value)
        } else if (value instanceof ArrayBuffer) {
          value = new Uint8Array(value)
        }
      }

      if (options.asBuffer === false) {
        if (typeof value === 'string' && value.indexOf("{\"storetype\":\"json\",\"data\"") > -1) {
          const res = JSON.parse(value)
          value = res.data
        }
      }

      callback(null, value)
    })
  }

  _del (key: string, _options: unknown, callback: LocalCallback) {

    const err = checkKeyValue(key, 'key')
  
    if (err) return nextTick(() => callback(err))

    // TODO: REMOVE! May be deprecated!
    // if (!Buffer.isBuffer(key)) key = String(key)
  
    this.container.removeItem(key, callback)
  }

  _batch (array: unknown[], options: unknown, callback: LocalCallback) {
    nextTick(() => {
      let numDone = 0
      let overallErr: unknown

      function checkDone () {
        if (++numDone === array.length) {
          callback(overallErr)
        }
      }

      if (Array.isArray(array) && array.length) {
        for (let i = 0; i < array.length; i++) {
          const task = array[i]

          if (task) {
            const key = task.key instanceof Uint8Array ? task.key : String(task.key)
            const keyErr = checkKeyValue(key, 'key')

            if (keyErr) {
              overallErr = keyErr
              checkDone()
            } else if (task.type === 'del') {
              this._del(task.key, options, checkDone)
            } else if (task.type === 'put') {
              const value = task.value instanceof Uint8Array ? task.value : String(task.value)
              const valueErr = checkKeyValue(value, 'value')

              if (valueErr) {
                overallErr = valueErr
                checkDone()
              } else {
                this._put(key, value, options, checkDone)
              }
            }
          } else {
            checkDone()
          }
        }
      } else {
        callback()
      }
    })
  }

  _iterator (options: LDIteratorOptions) {
    return new LDIterator(this, options)
  }

  static destroy (name: string, callback: LocalCallback) {
    LocalStorageCore.destroy(name, callback)
  }
}

interface LDIteratorOptions {
  reverse?: boolean
  end?: string
  start?: string
  gt?: string
  gte?: string
  lt?: string
  lte?: string
  exclusiveStart?: boolean
  values?: boolean
  limit?: number
}

class LDIterator extends AbstractIterator {
  db: LocalStorageDown
  #reverse: boolean
  #endkey?: string
  #startkey?: string
  #gt?: string
  #gte?: string
  #lt?: string
  #lte?: string
  #exclusiveStart?: boolean
  #keysOnly?: boolean
  #limit?: number
  #count = 0
  #pos = 0
  #keys: string[] = []
  onInitCompleteListeners: (() => void)[] = []
  initStarted = false
  initCompleted = false

  constructor (db: LocalStorageDown, options: LDIteratorOptions = {}) {
    super(db)

    this.db = db
    this.#reverse = !!options.reverse
    this.#endkey     = options.end
    this.#startkey   = options.start
    this.#gt      = options.gt
    this.#gte     = options.gte
    this.#lt      = options.lt
    this.#lte     = options.lte
    this.#exclusiveStart = options.exclusiveStart
    this.#keysOnly = options.values === false
    this.#limit = options.limit
  }

  #init (callback: (...args: any[]) => void) {
    nextTick(() => callback())
  }

  _next (callback: (...args: any[]) => void) {
    const onInitComplete =  () => {
      if (this.#pos === this.#keys.length || this.#pos < 0) { // done reading
        return callback()
      }
  
      const key = this.#keys[this.#pos]
  
      if (!!this.#endkey && (this.#reverse ? key < this.#endkey : key > this.#endkey)) {
        return callback()
      }
  
      if (!!this.#limit && this.#limit > 0 && this.#count++ >= this.#limit) {
        return callback()
      }
  
      if ((this.#lt  && key >= this.#lt) ||
        (this.#lte && key > this.#lte) ||
        (this.#gt  && key <= this.#gt) ||
        (this.#gte && key < this.#gte)) {
        return callback()
      }
  
      this.#pos += this.#reverse ? -1 : 1
      if (this.#keysOnly) {
        return callback(null, key)
      }
  
      this.db.container.getItem(key, (err, value) => {
        if (err) {
          if (err.message === 'NotFound') {
            return nextTick(() => {
              this._next(callback)
            })
          }
          return callback(err)
        }
        callback(null, key, value)
      })
    }

    if (!this.initStarted) {
      nextTick(() => {
        this.initStarted = true
        this.#init((err) => {
          if (err) {
            return callback(err);
          }
          this.db.container.keys((err, keys) => {
            if (err) {
              return callback(err)
            }
            this.#keys = keys ?? []
            if (this.#startkey) {
              const index = sortedIndexOf(this.#keys, this.#startkey)
              const startkey = (index >= this.#keys.length || index < 0)
                ? undefined
                : this.#keys[index]
              this.#pos = index

              if (this.#reverse) {
                if (this.#exclusiveStart || startkey !== this.#startkey) {
                  this.#pos--
                }
              } else if (this.#exclusiveStart && startkey === this.#startkey) {
                this.#pos++
              }
            } else {
              this.#pos = this.#reverse ? this.#keys.length - 1 : 0
            }

            onInitComplete()
  
            this.initCompleted = true
            let i = -1

            while (++i < this.onInitCompleteListeners.length) {
              nextTick(this.onInitCompleteListeners[i])
            }
          })
        })
      })
    } else if (!this.initCompleted) {
      this.onInitCompleteListeners.push(onInitComplete)
    } else {
      nextTick(onInitComplete)
    }
  }
}

function checkKeyValue (obj: any, type: string): Error | undefined {
  if (obj === null || obj === undefined) {
    return new Error(type + ' cannot be `null` or `undefined`')
  }

  if (type === 'key') {
    if (obj instanceof Boolean) {
      return new Error(type + ' cannot be `Boolean`')
    }
    if (obj === '') {
      return new Error(type + ' cannot be empty')
    }
  }

  if (obj.toString().indexOf("[object ArrayBuffer]") === 0) {
    if (obj.byteLength === 0 || obj.byteLength === undefined) {
      return new Error(type + ' cannot be an empty ArrayBuffer')
    }
  }

  if (obj instanceof Uint8Array) {
    if (obj.length === 0) {
      return new Error(type + ' cannot be an empty Uint8Array')
    }
  } else if (String(obj) === '') {
    return new Error(type + ' cannot be an empty String')
  }
}
