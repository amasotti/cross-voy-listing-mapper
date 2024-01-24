import { test } from "vitest"
import {SUPPORTED_TEMPLATE, TemplateParams} from "@/types/template";
import {SUPPORTED_LANGUAGES} from "@/constants/languages";
import {Template} from "../src/services/models/Template";

// Testing the individual methods and functions of the Template class
test('Template Class - parse function', () => {
    const templateString = "{{SEE|name=John}}";
    const template = Template.parse(templateString);

    expect(template).toBeInstanceOf(Template);
    expect(template.type).toBe(SUPPORTED_TEMPLATE.SEE);
    expect(template.params['name']).toBe('John');
});

test('Template Class - format function', () => {
    const params: TemplateParams = { name: "John" };
    const template = new Template(SUPPORTED_TEMPLATE.SEE, params);

    const expectedResult = "* {{SEE\n| name \n}}";
    expect(template.format(SUPPORTED_LANGUAGES.IT)).toBe(expectedResult);
});

test('Template Class - format function unsupported language', () => {
    const params: TemplateParams = { name: "John" };
    const template = new Template(SUPPORTED_TEMPLATE.SEE, params);

    const language = SUPPORTED_LANGUAGES.DE;
    try {
        template.format(language);
    } catch (error) {
        expect(error.message).toBe(`No formatter for language ${language} yet - be patient or help me!`)
    }
});