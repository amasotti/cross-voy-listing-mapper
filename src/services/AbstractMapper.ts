import {SUPPORTED_TEMPLATE, TemplateParams} from "@/types/template.ts";
import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {getSourceWikitext} from "@/services/fetch.service.ts";
import {Template} from "@/services/models/Template.ts";
import listingMapping from "@/mapping/listing.json";

export abstract class AbstractMapper {
    protected lang: SUPPORTED_LANGUAGES;

    async getText(article: string): Promise<string | null> {
        const rawText = await getSourceWikitext(article, this.lang);

        if (!rawText) {
            return null;
        }

        return rawText
    }

    protected buildTemplateArray(templates: string[]): Template[] {
        const templateArray: Template[] = [];
        for (const template of templates) {
            templateArray.push(Template.parse(template));
        }
        return templateArray;
    }


    protected extractTemplatesFromText(text:string): string[] {
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

    protected filterTemplates (templates: string[], targetTemplate: SUPPORTED_TEMPLATE): string[] {

        const filteredTemplates = [];
        for (const template of templates) {
            const templateName = template.substring(2, template.indexOf('|'));
            if (templateName.trim().toLowerCase() === targetTemplate.toLowerCase()) {
                filteredTemplates.push(template);
            }
        }
        return filteredTemplates;
    }


    protected mapTemplateArray (templates: Template[], targetLanguage: SUPPORTED_LANGUAGES): Template[] {
        const mappedTemplates: Template[] = [];
        for (const template of templates) {
            mappedTemplates.push(this.mapParams(template, targetLanguage));
        }
        return mappedTemplates;
    }

    protected mapParams (template:Template, targetLanguage: SUPPORTED_LANGUAGES): Template {
                const mappedParams: TemplateParams = {};



        // Collect all the keys mappings where the target language value is not NOT_AVAILABLE
        const keys = Object.keys(listingMapping).filter(key => listingMapping[key][targetLanguage] !== 'NOT_AVAILABLE');

        // @ts-ignore
        for (const entry of Object.entries(template.params)) {

            for (const key of keys) {
                const foreignKey = listingMapping[key][this.lang];
                const targetKey = listingMapping[key][targetLanguage];
                if (Object.keys(template.params).includes(foreignKey)) {

                    mappedParams[targetKey] = template.params[foreignKey];
                }
            }
        }
        return new Template(template.type, mappedParams);
    }

    /**
     * TODO: Add a strategy to choose the right mapping file
     * @param templates
     * @protected
     */
    protected formatIT(templates: Template[]): string {
        let text = '';
        for (const template of templates) {
            text += template.formatIT()
        }
        return text;
    }


    abstract async map(article: string, targetLanguage:SUPPORTED_LANGUAGES, template:SUPPORTED_TEMPLATE): Promise<string | null>;

}
