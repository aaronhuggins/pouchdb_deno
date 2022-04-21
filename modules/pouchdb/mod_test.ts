import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";
import PouchDB from "./mod.ts";

const indexedDBAdapters: ["idb", "indexeddb"] = ["idb", "indexeddb"];
const sysFilepath = "./system_db/__sysdb__.sqlite";
const filepath = "./user_db/foobar.sqlite";

Deno.test("PouchDB", async ({ step }) => {
  await step("is a function", () => {
    assertEquals(typeof PouchDB, "function");
  });

  for (const adapter of indexedDBAdapters) {
    await step(`adapter ${adapter} writes to file`, async () => {
      const Factory = PouchDB.defaults({
        // deno-lint-ignore no-explicit-any
        adapter: adapter as any,
        prefix: "./user_db/",
        systemPath: "./system_db/",
      });
      const db = new Factory("foobar");
      const result = await db.post({ hello: "world" });
      const actual = await db.get(result.id);

      assertEquals(result.ok, true);
      assertEquals(actual._id, result.id);

      // The two database backends are incompatible due to scema and indices. Destroy them.
      await db.destroy();
      // Call this during tests to clean up any hanging file resources before test finishes. Not for production use.
      dispatchEvent(new Event("unload"));

      const stat = Deno.statSync(filepath);
      const stat2 = Deno.statSync(sysFilepath);

      assertEquals(stat.isFile, true);
      assertEquals(stat2.isFile, true);
    });
  }

  Deno.removeSync(filepath);
  Deno.removeSync(sysFilepath);
});
