import { test } from "vitest"
import {SUPPORTED_TEMPLATE, TemplateParams} from "@/types/template";
import {SUPPORTED_LANGUAGES} from "@/constants/languages";
import {Template} from "../src/services/models/Template";

describe('Template Class - constructor', () => {

    describe('Parse templates', () => {
        test('Template Class - parse function', () => {
            const templateString = "{{SEE|name=John}}";
            const template = Template.parse(templateString);

            expect(template).toBeInstanceOf(Template);
            expect(template.type).toBe(SUPPORTED_TEMPLATE.SEE);
            expect(template.params['name']).toBe('John');
        });

    });







test('Template Class - format function', () => {
    const params: TemplateParams = { name: "John" };
    const template = new Template(SUPPORTED_TEMPLATE.SEE, params);

    const expectedResult = "* {{see\n" +
        "| nome=  | alt=  | sito=  | email=  \n" +
        "| indirizzo=  | lat=  | long=  | indicazioni=  \n" +
        "| tel=  | numero verde=  | fax=  \n" +
        "| orari=  | checkin=  | checkout=  | prezzo=  \n" +
        "| wikidata=  | immagine=  \n" +
        "| descrizione  \n" +
        "}}\n";
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

});