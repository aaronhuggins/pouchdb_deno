// deno-lint-ignore-file no-explicit-any
const nextTick = queueMicrotask
const storage = localStorage

export type LocalCallback<T = any> = (error?: any, value?: T) => void

export class LocalStorageCore {
  #prefix: string

  constructor (dbname: string) {
    this.#prefix = createPrefix(dbname)
  }

  getKeys (callback: LocalCallback<string[]>) {
    callbackify(callback, () => keysByPrefix(this.#prefix))
  }

  put (key: string, value: string, callback: LocalCallback<void>) {
    callbackify(callback, () => {
      storage.setItem(this.#prefix + key, value)
    })
  }

  get (key: string, callback: LocalCallback<string>) {
    callbackify(callback, () => storage.getItem(this.#prefix + key))
  }

  remove (key: string, callback: LocalCallback<void>) {
    callbackify(callback, () => {
      storage.removeItem(this.#prefix + key)
    })
  }

  static destroy (dbname: string, callback: LocalCallback) {
    callbackify(callback, () => {
      const prefix = createPrefix(dbname)

      for (const key of keysByPrefix(prefix, false)) {
        storage.removeItem(key)
      }
    })
  }
}

function callbackify (callback: LocalCallback, fun: (...args: any[]) => any) {
  let val: any
  let err: any

  try {
    val = fun()
  } catch (e) {
    err = e
  }

  nextTick(() => {
    callback(err, val)
  })
}

function createPrefix (dbname: string): string {
  return dbname.replace(/!/g, '!!') + '!'; // escape bangs in dbname;
}

function keysByPrefix (prefix: string, sort = true): string[] {
  const keys = []
  const prefixLen = prefix.length
  let i = -1
  const len = storage.length

  while (++i < len) {
    const fullKey = storage.key(i)

    if (fullKey && fullKey.startsWith(prefix)) {
      keys.push(fullKey.substring(prefixLen))
    }
  }

  if (sort) keys.sort()

  return keys
}
