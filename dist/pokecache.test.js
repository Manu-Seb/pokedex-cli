import { describe, expect, test } from 'vitest';
import { Cache } from './pokecache';
describe.each([
    { key: 'test1', value: { val: 'Test', num: 1 }, timer: 100 },
    { key: 'test2', value: { val: 2, num: 'test2' }, timer: 100 },
])(`checking the out of cache for $key`, ({ key, value, timer }) => {
    test.concurrent(`returns boolean`, () => {
        const cache = new Cache(timer);
        cache.add(key, value);
        const ret = cache.get(key);
        expect(ret?.val).toEqual(value);
        cache.stopReapLoop();
    });
});
describe.each([
    { key: 'test1', value: { val: 'Test', num: 1 }, timer: 7 },
    { key: 'test2', value: { val: 2, num: 'test2' }, timer: 5 },
])(`Checking if interval clear works`, ({ key, value, timer }) => {
    test.concurrent(`returns boolean`, async () => {
        const cache = new Cache(timer);
        cache.add(key, value);
        await new Promise((resolve) => setTimeout(resolve, timer + 10));
        const ret = cache.get(key);
        expect(ret).toBeUndefined();
        cache.stopReapLoop();
    });
});
