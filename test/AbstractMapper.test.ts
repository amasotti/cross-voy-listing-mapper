import {vi} from "vitest";
import {AbstractMapper} from "@/services/mapper/AbstractMapper";
import {Template} from "@/services/models/Template";
import {SUPPORTED_LANGUAGES} from "@/constants/languages";
import {SUPPORTED_TEMPLATE} from "@/types/template";


let abstractMapper: AbstractMapper;

class DummyMapper extends AbstractMapper {
    constructor() {
        super();
    }

    async map(article: string, targetLanguage: SUPPORTED_LANGUAGES, template: SUPPORTED_TEMPLATE): Promise<string | null> {
        return Promise.resolve(undefined);
    }
}

describe('AbstractMapper', () => {

    beforeEach(() => {
        abstractMapper = new DummyMapper();
    });


    describe('buildTemplateArray function', () => {
        test('should build proper template array', () => {
            const templates: string[] = [`{{see|param1=value1|param2=value2}}`,];

            const result = abstractMapper.buildTemplateArray(templates);

            expect(result).toEqual([new Template(SUPPORTED_TEMPLATE.SEE, {param1: 'value1', param2: 'value2'})]);
        });

        test('should handle an empty template array', () => {
            const templates: string[] = [];

            const result = abstractMapper.buildTemplateArray(templates);

            expect(result).toEqual([]);
        });
    });

    describe('formatTemplateArray function', () => {
        test('should throw for no formatter found', () => {

            const templates: Template[] = [new Template('see', {param1: 'value1', param2: 'value2'})];

            try {
                abstractMapper.formatTemplateArray(templates, SUPPORTED_LANGUAGES.IT);
            } catch (err) {
                expect(err.message).toBe('No formatter for language it yet - be patient or help me!');
            }

        });

        test('should handle an empty array', () => {
            const templates: Template[] = [];

            const result = abstractMapper.formatTemplateArray(templates, SUPPORTED_LANGUAGES.IT);

            expect(result).toBe('');
        });

    });

});