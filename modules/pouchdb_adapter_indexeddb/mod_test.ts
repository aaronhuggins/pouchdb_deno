import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";
import IndexedDBPouch from "./mod.ts";

Deno.test("IndexedDBPouch", () => {
  assertEquals(typeof IndexedDBPouch, "function");
});
