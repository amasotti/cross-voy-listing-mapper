import {WikitextParser} from "../src/services/parser/WikitextParser";


let parser: WikitextParser;

describe('AbstractMapper', () => {

    beforeEach(() => {
        parser = new WikitextParser();
    });

    describe('CleanText', () => {
        test('should remove new lines and spaces', () => {
            const text = `{{template|param1=value1|param2=value2}}`;

            const result = parser.cleanText(text);

            expect(result).toBe(`{{template|param1=value1|param2=value2}}`);
        });

        test('should handle piped wikilinks', () => {
            const text = `[[link|text]]`;

            const result = parser.cleanText(text);

            expect(result).toBe(`text`);
        });

        test('should handle new lines and spaces and piped wikilinks', () => {
            const text = `[[link|text1]]\n[[link|text2]] = {{template|param1=[[:w:link|text3]]}}`;

            const result = parser.cleanText(text);
            expect(result).toBe(`text1text2 = {{template|param1=text3}}`);
        });
    })


    describe('extractTemplatesFromText function', () => {
        test('should extract template correctly', () => {
            const text = `{{template|param1=value1|param2=value2}}`;

            const templates = parser.extractTemplatesFromText(text);

            expect(templates).toEqual([text]);
        });

        test('should handle no templates', () => {
            const text = '';

            const templates = parser.extractTemplatesFromText(text);

            expect(templates).toEqual([]);
        });
    });

});