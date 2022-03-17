const nil = new Int32Array(new SharedArrayBuffer(4));

export function sleep(ms: number | bigint) {
  if (typeof ms !== "number" && typeof ms !== "bigint") {
    throw TypeError("sleep: ms must be a number or bigint");
  }

  if (!(ms > 0 && ms < Infinity)) {
    throw RangeError(
      "sleep: ms must be a number that is greater than 0 but less than Infinity",
    );
  }

  Atomics.wait(nil, 0, 0, Number(ms));
}
