import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 400,
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 800,
    },
    {
        key: "https://example.com/path/ext/",
        val: "evenmoretestdata",
        interval: 1200,
    }
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    // interval + 100 would inconsistently fail, but this seems to be the safest interval
    await new Promise((resolve) => setTimeout(resolve, interval * 2 + 100));

    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
});