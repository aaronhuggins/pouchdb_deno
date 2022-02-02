import d64Any from 'https://cdn.skypack.dev/d64'
import inheritsFunc from 'https://cdn.skypack.dev/inherits'

type Inherits = (constructor: unknown, superConstructor: unknown) => void

interface D64 {
  encode (input: Uint8Array): string
  decode (input: string): Uint8Array
}

const d64: D64 = d64Any
const inherits: Inherits = inheritsFunc

export { AbstractLevelDOWN, AbstractIterator } from 'https://cdn.skypack.dev/abstract-leveldown?dts'

export {
  d64,
  inherits
}
