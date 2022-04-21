import { capturePlugin } from "../pouchdb_deno_utils/capture_plugin.ts";
import "https://cdn.skypack.dev/pin/pouchdb@v7.3.0-bcA2ZAvx5a5vy7YRYZRz/mode=imports/unoptimized/dist/pouchdb.memory.js";
import type { PouchDB } from "../pouchdb_types/pouchdb.ts";

// Because we're using the vanilla browser export, the Memory plugin expects
// a PouchDB global. Function capturePlugin fakes the global and capture the
// passed plugin for use later with real PouchDB for Deno.
const MemoryPouchDeno: (pouchDb: PouchDB.Static) => void = capturePlugin(
  "MemoryPouchPlugin",
);

export default MemoryPouchDeno;
