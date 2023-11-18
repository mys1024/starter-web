/// <reference lib="deno.unstable" />

const kv = await Deno.openKv();

export { kv };
