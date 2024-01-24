import {SUPPORTED_TEMPLATE, TemplateParams} from "@/types/template.ts";
import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {getSourceWikitext} from "@/services/fetch.service.ts";
import {Template} from "@/services/models/Template.ts";
import listingMapping from "@/mapping/listing.json";

export abstract class AbstractMapper {
    protected lang: SUPPORTED_LANGUAGES;

    async getText(article: string): Promise<string | null> {
        const rawText = await getSourceWikitext(article, this.lang);
        return rawText ? this.cleanText(rawText) : null;
    }

    private cleanText(text: string): string {
        return this.handlePipedWikilinks(this.removeNewLinesAndSpaces(text));
    }

    protected buildTemplateArray(templates: string[]): Template[] {
        return templates.map(template => Template.parse(template));
    }

    protected extractTemplatesFromText(text) {
        const templates = [];
        const nestedTemplates = [];
        let depth = 0;
        let startIndex = -1;

        text = this.removeNewLinesAndSpaces(text);
        text = this.handlePipedWikilinks(text);

        for (let i = 0; i < text.length; i++) {
            if (text.startsWith('{{', i)) {
                depth++;
                if (depth === 1) {
                    startIndex = i;
                }
                i++; // Skip next '{'
            } else if (text.startsWith('}}', i)) {
                if (depth === 1) {
                    const templateContent = text.substring(startIndex, i + 2);
                    templates.push(templateContent);
                } else if (depth > 1) {
                    const nestedContent = text.substring(startIndex, i + 2);
                    nestedTemplates.push(nestedContent);
                }
                depth--;
                i++; // Skip next '}'
            }
        }

        return this.removeNestedTemplates(templates, nestedTemplates);
    }

    private removeNewLinesAndSpaces(text) {
        return text.replace(/(\r\n|\n|\r)/gm, "");
    }

    private handlePipedWikilinks(text) {
        return text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
    }

    private removeNestedTemplates(templates, nestedTemplates) {
        return templates.map(template => {
            nestedTemplates.forEach(nested => {
                template = template.replace(nested, '__NESTED_TEMPLATE__');
            });
            return template;
        });
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

    protected mapParams(template: Template, targetLanguage: SUPPORTED_LANGUAGES): Template {
        const mappedParams: TemplateParams = {};
        const keysToMap = this.getKeysToMap(targetLanguage);

        for (const [key, value] of Object.entries(template.params)) {
            if (keysToMap.has(key)) {
                mappedParams[listingMapping[key][targetLanguage]] = value;
            }
        }

        return new Template(template.type, mappedParams);
    }

    private getKeysToMap(targetLanguage: SUPPORTED_LANGUAGES): Set<string> {
        return new Set(Object.keys(listingMapping).filter(key => listingMapping[key][targetLanguage] !== 'NOT_AVAILABLE'));
    }


    formatTemplateArray(templates: Template[], lang: SUPPORTED_LANGUAGES): string {
        let text = '';
        try {
            for (const template of templates) {
                text += template.format(lang)
            }
            return text;
        } catch (err) {
            console.log(err);
            throw new Error('Error while formatting template');
        }

    }


    abstract async map(article: string, targetLanguage:SUPPORTED_LANGUAGES, template:SUPPORTED_TEMPLATE): Promise<string | null>;

}
