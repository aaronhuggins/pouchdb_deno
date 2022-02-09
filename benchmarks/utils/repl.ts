import { StringReader, copyN } from 'https://deno.land/std@0.100.0/io/mod.ts'
import { sleep } from './sleep.ts'

export class REPL {
  #process: Deno.Process<{
    cmd: ['deno']
    stdin: 'piped'
  }>

  constructor (env?: Record<string, string>) {
    this.#process = Deno.run({
      cmd: ['deno'],
      stdin: 'piped',
      env: env
    })
    sleep(500)
  }

  send(code: string) {
    const reader = new StringReader(code + '\n')
    copyN(reader, this.#process.stdin, reader.length)
  }

  async close () {
    this.send('close()')
    return await this.#process.status()
  }
}
