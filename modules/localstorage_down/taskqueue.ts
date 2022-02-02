// deno-lint-ignore-file no-explicit-any
import { Queue } from './queue.ts'

const nextTick = queueMicrotask

interface TaskItem {
  fun: (...args: any[]) => void
  callback: (...args: any[]) => void
}

export class TaskQueue {
  queue = new Queue<TaskItem>()
  running = false

  add (fun: TaskItem['fun'], callback: TaskItem['callback']) {
    this.queue.push({ fun, callback })
    this.processNext()
  }

  processNext () {
    if (this.running || !this.queue.length) {
      return
    }

    this.running = true

    const task = this.queue.shift()

    if (task) {
      nextTick(() => {
        task.fun((...args: any[]) => {
          task.callback.apply(null, args)
          this.running = false
          this.processNext()
        })
      })
    }
  }
}
