import {SUPPORTED_TEMPLATE, TemplateParams} from "@/types/template.ts";

export class Template {
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

    static parse(template: string): Template {
            const templateType = Template.extractTemplateType(template);
            const params = Template.extractTemplateParams(template);

            return new Template(templateType, params);
    }

    static extractTemplateType (template: string): SUPPORTED_TEMPLATE {
        // The template type is the first word after '{{'
        const startIndex = template.indexOf('{{') + 2;


        // Russian style
        if (template.substring(startIndex, startIndex + 7) === 'listing') {
            // then it follows a param "type=see", where see is the template type
            return Template.extractTemplateParams(template)?.type as SUPPORTED_TEMPLATE;
        }

        const endIndex = template.indexOf('|');

        if (endIndex === -1) {
            throw new Error('Template type not found');
        }

        const templateType = template.substring(startIndex, endIndex);

        return templateType as SUPPORTED_TEMPLATE;
    }

    static extractTemplateParams (template: string): TemplateParams {
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
}