import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";
import type { PouchDB as IPouchDB } from "../pouchdb/mod.ts";
import PouchDB from "../pouchdb/mod.ts";
import UpsertPlugin from "./mod.ts";

Deno.test("UpsertPlugin", async ({ step }) => {
  let db: IPouchDB.Database | undefined;

  await step("plugin is an object", () => {
    assertEquals(typeof UpsertPlugin, "object");
    assertEquals(typeof UpsertPlugin.putIfNotExists, "function");
    assertEquals(typeof UpsertPlugin.upsert, "function");
    assertEquals(typeof UpsertPlugin.upsertAndMerge, "function");
    assertEquals(typeof UpsertPlugin.upsertAndReplace, "function");
  });

  await step("plugin adds methods to PouchDB", () => {
    PouchDB.plugin(UpsertPlugin);
    db = new PouchDB("upsertdb", { adapter: "memory" });

    assertEquals(typeof db.putIfNotExists, "function");
    assertEquals(typeof db.upsert, "function");
    assertEquals(typeof db.upsertAndMerge, "function");
    assertEquals(typeof db.upsertAndReplace, "function");
  });

  await step("plugin methods modify database", async () => {
    const original = {
      _id: "mydoc",
      counter: 1,
    };

    const res1 = await db?.putIfNotExists(original);

    assertEquals(res1?.updated, true);

    original.counter++;

    const res2 = await db?.putIfNotExists(original);

    assertEquals(res2?.updated, false);

    original.counter++;

    const res3 = await db?.upsert<typeof original>(original._id, (existing) => {
      assertEquals(existing.counter, 1);
      assertEquals(original.counter, 3);

      return false;
    });

    assertEquals(res3?.updated, false);

    original.counter++;

    type RecordFoo = { foo: "bar" } & typeof original;

    const res4 = await db?.upsertAndMerge<RecordFoo>({
      ...original,
      foo: "bar",
    });

    assertEquals(res4?.updated, true);

    original.counter++;

    const recordFoo = await db?.get<RecordFoo>(original._id);

    assertEquals(recordFoo?.foo, "bar");

    original.counter++;

    const res5 = await db?.upsertAndReplace(original);

    assertEquals(res5?.updated, true);

    const record = await db?.get<typeof original>(original._id);

    assertEquals(record?.counter, 6);
  });
});
