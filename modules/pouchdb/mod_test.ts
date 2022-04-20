import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts";
import PouchDB from "./mod.ts";

Deno.test("PouchDB", async ({ step }) => {
  await step("is a function", () => {
    assertEquals(typeof PouchDB, "function");
  });

  await step("writes file to path", async () => {
    const sysFilepath = "./system_db/__sysdb__.sqlite";
    const filepath = "./user_db/foobar.sqlite";
    const Factory = PouchDB.defaults({
      adapter: "idb",
      prefix: "./user_db/",
      systemPath: "./system_db/",
    });
    const db = new Factory("foobar");

    await db.post({ hello: "world" });
    await db.destroy();
    // Call this during tests to clean up any hanging file resources before test finishes. Not for production use.
    dispatchEvent(new Event("unload"));

    const stat = Deno.statSync(filepath);
    const stat2 = Deno.statSync(sysFilepath);

    assertEquals(stat.isFile, true);
    assertEquals(stat2.isFile, true);

    Deno.removeSync(filepath);
    Deno.removeSync(sysFilepath);
  });
});
