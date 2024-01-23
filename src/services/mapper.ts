import see from "../mapping/see.json";

enum SUPPORTED_TEMPLATE {
    SEE = 'see',
    LIST = 'list',
    INFOBOX = 'infobox',
    GEO = 'geo'
}

type TemplateMapper = (template: Template, sourceLang: string, targetLang: string) => Template;
class Template {
    type: SUPPORTED_TEMPLATE;
    params: TemplateParams;

    constructor(type: SUPPORTED_TEMPLATE, params: TemplateParams) {
        this.type = type;
        this.params = params;
    }

    toString(): string {
        let text = '* {{' + this.type;
        for (const key in this.params) {
            text += ' | ' + key + '= ' + this.params[key];
        }
        text += '}}\n\n';

        return text;
    }
}

interface TemplateParams {
    [key: string]: string
}

export const mapText = (text: string, sourceLang: string, targetLang: string): string => {
    const templates = extractTemplates(text);

    let mappedTemplates: Template[] = []
    for (const template of templates) {
        const parsedTemplate = parseTemplate(template);

        const mapper = setMappingStrategy(parsedTemplate.type);
        const mappedTemplate = mapper(parsedTemplate, sourceLang, targetLang);
        mappedTemplates.push(mappedTemplate);
    }

    return joinTemplates(mappedTemplates);
}






const setMappingStrategy = (templateType: SUPPORTED_TEMPLATE): TemplateMapper => {
    switch (templateType) {
        case SUPPORTED_TEMPLATE.SEE:
            return mapSeeTemplate;
        default:
            throw new Error('Template type not supported');
    }
}

const mapSeeTemplate = (template: Template, sourceLang: string, targetLang: string): Template => {
    const mappedParams: TemplateParams = {};
    console.log(template.type)
    console.log(see[template.type])
    console.log("Target lang: " + targetLang)
    console.log("Source lang: " + sourceLang)

    const mapping = see[template.type];
    console.log("Mapping: " + mapping)

    for (const [key, value] of Object.entries(template.params)) {

        // Collect all the keys mappings where the target language value is not NOT_AVAILABLE
        const keys = Object.keys(mapping).filter(key => mapping[key][targetLang] !== 'NOT_AVAILABLE');

        for (const key of keys) {
            if (Object.keys(template.params).includes(key)) {
                mappedParams[mapping[key][targetLang]] = template.params[key] || '';
            }
        }



    }

    console.log(mappedParams)
    return new Template(template.type, mappedParams);
}

const extractTemplates = (text:string): string[] => {
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


const parseTemplate = (template: string): Template => {
    const templateType = extractTemplateType(template);
    const params = extractTemplateParams(template);

    return new Template(templateType, params);
}

const extractTemplateType = (template: string): SUPPORTED_TEMPLATE => {
    // The template type is the first word after '{{'
    const startIndex = template.indexOf('{{') + 2;
    const endIndex = template.indexOf('|');

    if (endIndex === -1) {
        throw new Error('Template type not found');
    }

    const templateType = template.substring(startIndex, endIndex);

    return templateType as SUPPORTED_TEMPLATE;
}

const extractTemplateParams = (template: string): TemplateParams => {
    const params: TemplateParams = {};
    const startIndex = template.indexOf('|') + 1;
    const endIndex = template.lastIndexOf('}}');
    const paramsString = template.substring(startIndex, endIndex);

    const paramStrings = paramsString.split('|');

    for (const paramString of paramStrings) {
        const [key, value] = paramString.split('=');
        params[key.trim()] = value.trim();
    }

    return params;
}


const joinTemplates = (templates: Template[]): string => {
    let text = '';
    for (const template of templates) {
        text += template.toString();
    }
    return text;
}
