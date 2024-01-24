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


    formatIT(): string {
        let formattedString = '* {{' + this.type + '\n';

        // First line: nome, alt, sito, email if available, all on the same line
        for (const key of ['nome', 'alt', 'sito', 'email']) {
            if (this.params[key]) {
                formattedString += '| ' + key + '= ' + this.params[key] + ' ';
            }
        }
        formattedString += '\n';

        // Then indirizzo, lat, long, indicazioni
        for (const key of ['indirizzo', 'lat', 'long', 'indicazioni']) {
            if (this.params[key]) {
                formattedString += '| ' + key + '= ' + this.params[key] + ' ';
            } else {
                formattedString += '| ' + key + '= ' + ' ';
            }
        }
        formattedString += '\n';

        // then tel, numero verde, fax
        for (const key of ['tel', 'numero verde', 'fax']) {
            if (this.params[key]) {
                formattedString += '| ' + key + '= ' + this.params[key] + ' ';
            } else {
                formattedString += '| ' + key + '= ' + ' ';
            }
        }
        formattedString += '\n';

        // then orari, prezzo
        for (const key of ['orari', 'checkin', 'checkout', 'prezzo']) {
            if (this.params[key]) {
                formattedString += '| ' + key + '= ' + this.params[key] + ' ';
            } else {
                // checkin and checkout are only for SLEEP which doesn't have orari
                // Other types will include instead orari and prezzo but not checkin and checkout

                if ((key === 'checkin' || key === 'checkout') && this.type === SUPPORTED_TEMPLATE.SLEEP) {
                    formattedString += '| ' + key + '= ' + ' ';
                } else {

                    if (key in ['orari', 'prezzo'] && this.type === SUPPORTED_TEMPLATE.SLEEP) {
                        formattedString += '| ' + key + '= ' + ' ';
                    }
                }
            }
        }
        formattedString += '\n';

        // then descrizione
        if (this.params['descrizione']) {
            formattedString += '| descrizione= ' + this.params['descrizione'] + ' ';
        } else {
            formattedString += '| descrizione= ' + ' ';
        }

        formattedString += '\n}}\n';

        return formattedString;
    }

}