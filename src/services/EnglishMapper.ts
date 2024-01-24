import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {getSourceWikitext} from "@/services/fetch.service.ts";
import {AbstractMapper} from "@/services/AbstractMapper.ts";
import {SUPPORTED_TEMPLATE} from "@/types/template.ts";
import {Template} from "@/services/models/Template.ts";


export class EnglishMapper extends AbstractMapper {

    constructor() {
        super();
        this.lang = SUPPORTED_LANGUAGES.EN;
    }


    async map(article: string, targetLanguage: SUPPORTED_LANGUAGES, targetTemplate: SUPPORTED_TEMPLATE): Promise<string | null> {

        const text = await this.getText(article);
        if (!text) {
            return null;
        }


        const templatesInArticle = this.extractTemplatesFromText(text);
        const wishedTemplate = this.filterTemplates(templatesInArticle, targetTemplate);

        if (wishedTemplate.length === 0) {
            return null;
        }

        const templateArray = this.buildTemplateArray(wishedTemplate);
        const mappedTemplates = this.mapTemplateArray(templateArray, targetLanguage);

        let result = this.formatIT(mappedTemplates);

        return result;
    }




}