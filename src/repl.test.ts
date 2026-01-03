import { cleanInput } from './repl';
import { describe, expect, test } from 'vitest';

describe.each([
    { input: 'hello world', output: ['hello', 'world'] },
    { input: 'Hello World', output: ['hello', 'world'] },
    { input: 'My Name Is Manu', output: ['my', 'name', 'is', 'manu'] },
])('Clean input testing for $input', ({ input, output }) => {
    test(`returns ${output}`, () => {
        let actual = cleanInput(input);
        expect(actual).toHaveLength(output.length);
        for (const i in output) {
            expect(actual[i]).toBe(output[i]);
        }
    });
});
