import {SUPPORTED_TEMPLATE, TemplateParams} from "@/types/template.ts";
import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {getSourceWikitext} from "@/services/fetch.service.ts";
import {Template} from "@/services/models/Template.ts";
import listingMapping from "@/mapping/listing.json";
import {WikitextParser} from "@/services/parser/WikitextParser.ts";
import {ListingParams, ParamLocalLabel} from "@/types/listing.ts";

export abstract class AbstractMapper {
    protected lang: SUPPORTED_LANGUAGES;
    parser = new WikitextParser();
    private readonly NON_AVAILABLE_LABEL = 'NOT_AVAILABLE';

    protected constructor(lang: SUPPORTED_LANGUAGES) {
        this.lang = lang;
    }


    async getText(article: string): Promise<string | null> {
        const rawText = await getSourceWikitext(article, this.lang);
        return rawText ? this.parser.cleanText(rawText) : null;
    }


    buildTemplateArray(templates: string[]): Template[] {
        return templates.map(template => Template.parse(template));
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
                // @ts-ignore
                mappedParams[listingMapping[key][targetLanguage]] = value;
            }
        }

        return new Template(template.type, mappedParams);
    }

    private getKeysToMap(targetLanguage: SUPPORTED_LANGUAGES): Set<string> {

        // @ts-ignore
        const filteredKeys = Object.keys(listingMapping as ListingParams).filter(
            key => {
                // @ts-ignore
                const keyMapping: ParamLocalLabel = listingMapping[key];
                const mappedKey: string = keyMapping[targetLanguage];
                return (mappedKey as string) !== this.NON_AVAILABLE_LABEL
            }
        );

        return new Set(filteredKeys);
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


    abstract map(article: string, targetLanguage:SUPPORTED_LANGUAGES, template:SUPPORTED_TEMPLATE): Promise<string | null>;

}
