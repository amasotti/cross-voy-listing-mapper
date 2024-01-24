import {SUPPORTED_TEMPLATE, TemplateParams} from "@/types/template.ts";
import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {addSpaces} from "@/utils/strings.utils.ts";

export class Template {
    static readonly TEMPLATE_START = '{{';
    static readonly TEMPLATE_END = '}}';
    static readonly PARAM_SEPARATOR = '|';
    static readonly PARAM_VALUE_SEPARATOR = '=';


    constructor(public type: SUPPORTED_TEMPLATE, public params: TemplateParams) {
        this.type = type;
        this.params = params;
    }

    // toString(): string {
    //     const paramsString = Object.entries(this.params)
    //         .map(([key, value]) => `${addSpaces(Template.PARAM_SEPARATOR, 1, 1)}${key}${addSpaces(Template.PARAM_VALUE_SEPARATOR, 1)}${value}`)
    //         .join('');
    //     return `* ${Template.TEMPLATE_START}${this.type}${paramsString}${Template.TEMPLATE_END}\n\n`;
    // }

    static parse(template: string): Template {
            const templateType = Template.extractTemplateType(template);
            const params = Template.extractTemplateParams(template);

            return new Template(templateType, params);
    }

    /**
     * Extracts the template type from the given template string.
     *
     * @param {string} template - The template string.
     * @throws {Error} When the template type is not found or is unsupported.
     * @returns {SUPPORTED_TEMPLATE} The extracted template type.
     */
    private static extractTemplateType(template: string): SUPPORTED_TEMPLATE {
        const startIndex = template.indexOf(Template.TEMPLATE_START) + 2;
        const endIndex = template.indexOf(Template.PARAM_SEPARATOR, startIndex);
        if (endIndex === -1) {
            throw new Error('Template type not found');
        }
        const templateType = template.substring(startIndex, endIndex).trim();

        // If templateType is not a value of the enum SUPPORTED_TEMPLATE, throw an error
        if (!Object.values(SUPPORTED_TEMPLATE).includes(templateType as SUPPORTED_TEMPLATE)) {
            throw new Error(`Unsupported template type: ${templateType}`);
        }


        return templateType as SUPPORTED_TEMPLATE;
    }


    private static extractTemplateParams(template: string): TemplateParams {
        const params: TemplateParams = {};
        const paramsString = template.substring(template.indexOf(Template.PARAM_SEPARATOR) + 1, template.lastIndexOf(Template.TEMPLATE_END));
        paramsString.split(Template.PARAM_SEPARATOR).forEach(paramString => {
            const [key, value] = paramString.split(Template.PARAM_VALUE_SEPARATOR).map(s => s.trim());
            if (key) params[key] = value;
        });
        return params;
    }

    format(lang: SUPPORTED_LANGUAGES) : string {
        switch (lang) {
            case SUPPORTED_LANGUAGES.IT:
                return this.formatIT();
            default:
                throw new Error(`No formatter for language ${lang} yet - be patient or help me!`);
        }
    }

    formatIT(): string {
        let formattedString = `* ${Template.TEMPLATE_START}${this.type}\n`;

        const paramGroups = [
            ['nome', 'alt', 'sito', 'email'],
            ['indirizzo', 'lat', 'long', 'indicazioni'],
            ['tel', 'numero verde', 'fax'],
            ['orari', 'checkin', 'checkout', 'prezzo'],
            ['wikidata', 'immagine'],
            ['descrizione']
        ];

        paramGroups.forEach(group => {
            formattedString += this.formatParamGroup(group) + '\n';
        });

        formattedString += Template.TEMPLATE_END + '\n';
        return formattedString;
    }

    private formatParamGroup(keys: string[]): string {
        return keys.map(key => {
            const value = this.params[key] || '';
            const spaceAfterKey = key === 'descrizione' ? ' ' : addSpaces(Template.PARAM_VALUE_SEPARATOR, 1);
            return addSpaces(Template.PARAM_SEPARATOR, 1) + key + spaceAfterKey + addSpaces(value, 1);
        }).join('');
    }

}