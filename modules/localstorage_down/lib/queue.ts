// deno-lint-ignore-file no-explicit-any
interface QueueNode<T = any> {
  item: T
  next?: QueueNode<T>
}

export class Queue<T = any> {
  length = 0
  #first?: QueueNode
  #last?: QueueNode

  push (item: T): void {
    const node = { item }

    if (this.#last) {
      this.#last = this.#last.next = node
    } else {
      this.#last = this.#first = node
    }

    this.length++
  }

  shift (): T | undefined {
    const node = this.#first

    if (node) {
      this.#first = node.next

      if (!(--this.length)) {
        this.#last = undefined
      }

      return node.item
    }
  }

  slice (start?: number, end?: number): T[] {
    start = typeof start === 'undefined' ? 0 : start
    end = typeof end === 'undefined' ? Infinity : end
    const output = []
    let i = 0

    for (let node = this.#first; node; node = node.next) {
      if (--end < 0) {
        break;
      } else if (++i > start) {
        output.push(node.item)
      }
    }

    return output
  }
}
