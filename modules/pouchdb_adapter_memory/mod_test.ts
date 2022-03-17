import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts";
import MemoryPouch from "./mod.ts";

Deno.test("MemoryPouch", () => {
  assertEquals(typeof MemoryPouch, "function");
});
