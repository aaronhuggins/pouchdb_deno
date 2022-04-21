import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";
import IDBPouch from "./mod.ts";

Deno.test("IDBPouch", () => {
  assertEquals(typeof IDBPouch, "function");
});
