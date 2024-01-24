// sum.test.js
import { expect, test } from 'vitest'

export function sum(a, b) {
    return a + b
}

describe('test',() => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3)
    })
})