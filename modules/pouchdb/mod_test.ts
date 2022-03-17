import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts";
import PouchDB from "./mod.ts";

Deno.test("PouchDB", () => {
  assertEquals(typeof PouchDB, "function");
});
