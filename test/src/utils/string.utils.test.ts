import {addNewLines, addSpaces} from "../../../src/utils/strings.utils";


describe('StringUtils', () => {
    describe('addSpaces function', () => {
        test('should add spaces correctly', () => {
            const res = addSpaces('test', 1, 2);
            expect(res).toBe('  test ');
        });

        test('should add spaces correctly', () => {
            const res = addSpaces('test', 0, 2);
            expect(res).toBe('  test');
        });

        test('should add spaces correctly', () => {
            const res = addSpaces('test', 1, 0);
            expect(res).toBe('test ');
        });

        test('should add spaces correctly', () => {
            const res = addSpaces('test', 0, 0);
            expect(res).toBe('test');
        });
    })


    describe('addNewLines function', () => {
        test('should add new lines correctly', () => {
            const res = addNewLines('test', 1);
            expect(res).toBe('test\n');
        });

        test('should add new lines correctly', () => {
            const res = addNewLines('test', 2);
            expect(res).toBe('test\n\n');
        });

        test('should add new lines correctly', () => {
            const res = addNewLines('test', 0);
            expect(res).toBe('test');
        });
    })
});