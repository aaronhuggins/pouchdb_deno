export const TEMP_DENO_CACHE = './.cache'

export async function mkCache () {
  try {
    await Deno.mkdir(TEMP_DENO_CACHE, { recursive: true })
  } catch (_err) { /* Just ensure the dir exists. */ }

  return await Deno.realPath(TEMP_DENO_CACHE)
}
