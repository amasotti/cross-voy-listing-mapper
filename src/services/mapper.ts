import {Template} from "@/services/models/Template.ts";
import {SUPPORTED_TEMPLATE, TemplateMapper} from "@/types/template.ts";
import {mapListing} from "@/services/listing.mapper.ts";

export const mapText = (text: string, sourceLang: string, targetLang: string): string => {
    const templates = extractTemplatesFromText(text);

    let mappedTemplates: Template[] = []
    for (const template of templates) {
        const parsedTemplate = Template.parse(template)

        const mapper = setMappingStrategy(parsedTemplate.type);
        const mappedTemplate = mapper(parsedTemplate, sourceLang, targetLang);
        mappedTemplates.push(mappedTemplate);
    }

    return joinTemplatesToString(mappedTemplates);
}

const extractTemplatesFromText = (text:string): string[] => {
    const templates = [];
    let depth = 0;
    let startIndex = -1;
    let endIndex = 0;

    // first delete all empty spaces and new lines
    text = text.replace(/(\r\n|\n|\r)/gm, "");

    // Now extract all templates, based on the depth of the brackets.
    // A template always starts with '{{' and ends with '}}'
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '{' && text[i + 1] === '{') {
            depth++;
            if (depth === 1) {
                startIndex = i;
            }
            i++; // Skip next '{' as it's part of the current one
        } else if (text[i] === '}' && text[i + 1] === '}') {
            depth--;
            if (depth === 0) {
                endIndex = i + 1;
                templates.push(text.substring(startIndex, endIndex + 1));
            }
            i++; // Skip next '}' as it's part of the current one
        }
    }

    return templates;
}


const setMappingStrategy = (templateType: SUPPORTED_TEMPLATE): TemplateMapper => {
    switch (templateType) {
        case SUPPORTED_TEMPLATE.SEE:
        case SUPPORTED_TEMPLATE.SLEEP:
        case SUPPORTED_TEMPLATE.DRINK:
        case SUPPORTED_TEMPLATE.EAT:
        case SUPPORTED_TEMPLATE.DO:
            return mapListing;
        default:
            throw new Error('Template type not supported');
    }
}

const joinTemplatesToString = (templates: Template[]): string => {
    let text = '';
    for (const template of templates) {
        text += template.toString();
    }
    return text;
}