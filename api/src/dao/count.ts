import { kv } from "./_kv.ts";

const KEY_COUNT = ["count"];

async function getCount() {
  const countRes = await kv.get<number>(KEY_COUNT);
  if (countRes.value !== null) {
    return countRes.value;
  } else {
    await kv.set(KEY_COUNT, 0);
    return 0;
  }
}

async function increaseCount() {
  let ok = false;
  while (!ok) {
    const countRes = await kv.get<number>(KEY_COUNT);
    const atomicRes = await kv.atomic()
      .check(countRes)
      .set(KEY_COUNT, (countRes.value || 0) + 1)
      .commit();
    ok = atomicRes.ok;
  }
}

export { getCount, increaseCount };
