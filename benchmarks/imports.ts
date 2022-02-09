// Run with `deno run --allow-read --allow-write --allow-run benchmarks/imports.ts`
import { REPL } from './utils/repl.ts'
import { mkCache } from './utils/mk_cache.ts'

const REAL_TEMP_CACHE = await mkCache()
const repl = new REPL({ DENO_DIR: REAL_TEMP_CACHE })

performance.mark('imports_start')
repl.send('await import("https://deno.land/x/pouchdb_deno@v1.0.0-PouchDB+7.2.2/modules/pouchdb/mod.ts")')
await repl.close()
performance.mark('imports_end')
performance.measure('imports', 'imports_start', 'imports_end')

const [measure] = performance.getEntriesByName('imports')

await Deno.remove(REAL_TEMP_CACHE, { recursive: true })

console.log('Duration of imports in seconds:', (measure.duration / 1000).toFixed(4))
console.log('Duration of imports in milliseconds:', measure.duration.toFixed(4))
